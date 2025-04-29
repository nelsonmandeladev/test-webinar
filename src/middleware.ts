import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import { i18nConfig } from "@/locales";

export function middleware(request: NextRequest) {
  // Handle i18n routing
  const i18nResponse = i18nRouter(request, i18nConfig);

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Get the locale from the first segment of the path
  const locale = pathname.split("/")[1];

  // If no valid locale, redirect to default locale
  if (!locale || !["fr", "en"].includes(locale)) {
    return NextResponse.redirect(new URL("/fr" + pathname, request.url));
  }

  // List of public routes that don't need authentication
  const authRoutes = [
    `/${locale}/login`,
    `/${locale}/register`,
  ];

  // Check for access_token cookie
  const accessToken = request.cookies.get('access_token');

  // Check if current path is a public route
  const isPublicRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublicRoute) {
    // If user is logged in and tries to access public routes, redirect to home
    if (accessToken) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  } else {
    // For all other routes, require authentication
    if (!accessToken) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return i18nResponse;
}

// Updated matcher to handle localized routes
export const config = {
  matcher: ["/", "/(fr|en)/:path*"],
};
