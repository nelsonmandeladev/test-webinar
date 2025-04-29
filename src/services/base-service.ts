import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: Record<string, string | number | boolean> | FormData;
  headers?: Record<string, string>;
  authenticated?: boolean;
  query?: Record<string, string | number | boolean | Date>;
  tag?: string;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export abstract class BaseApiService {
  protected defaultHeaders: Record<string, string>;
  protected tokenCookieName: string;

  constructor(
    tokenCookieName: string = "access_token",
    defaultHeaders: Record<string, string> = {},
  ) {
    this.tokenCookieName = tokenCookieName;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  /**
   * Remove the access token cookie
   */
  public async clearAccessToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(this.tokenCookieName);
  }

  /**
   * Get the access token from cookies
   * @returns The access token or null if not found
   */
  protected async getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value ?? null;
  }

  /**
   * Construct full URL with query parameters
   */
  private async buildUrl(
    endpoint: string,
    query?: Record<string, string | number | boolean | Date>,
  ): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const url = new URL(`${baseUrl}${endpoint.replace(/^\//, "")}`);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    return url.toString();
  }

  /**
   * Prepare headers for the request
   */
  private async prepareHeaders(options: ApiRequestOptions): Promise<Headers> {
    const headers = new Headers(this.defaultHeaders);

    // Add custom headers
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    // Handle authentication
    if (options.authenticated) {
      const token = await this.getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  }

  /**
   * Make an API request with comprehensive error handling
   */
  protected async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {},
    responseSchema?: z.ZodType<T>,
  ): Promise<ApiResponse<T>> {
    const { method = "GET", body, query } = options;

    try {
      const url = await this.buildUrl(endpoint, query);
      const headers = await this.prepareHeaders(options);

      const fetchOptions: RequestInit = {
        method,
        headers,
        ...(body && {
          body: body instanceof FormData ? body : JSON.stringify(body),
        }),
        next: {
          tags: [options.tag ?? ""],
        },
      };
      const response = await fetch(url, fetchOptions);
      // Handle different status codes
      if (!response.ok) {
        switch (response.status) {
          case 401:
            // Clear token on unauthorized access
            return redirect("/fr/logout");
          // case 500:
          //   throw new ApiError("Internal Server Error", 500);
        }
      }

      try {
        // Parse response
        const responseData = await response.json();
        // Validate response if schema is provided
        if (responseSchema) {
          const validationResult = responseSchema.safeParse(responseData);
          if (!validationResult.success) {
            throw new ApiError(
              "Response Validation Failed",
              422,
              validationResult.error,
            );
          }
        }

        return {
          status: response.status,
          response: responseData,
        };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}
