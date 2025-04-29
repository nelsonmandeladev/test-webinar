import { BaseApiService } from "./base-service";

export class AuthService extends BaseApiService {
    private BASE_AUTH_URL = "auth/";
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async register(data: AuthRequestType) {
        return await this.request(
            `${this.BASE_AUTH_URL}sign-up`,
            {
                method: "POST",
                body: data,
            },
        );
    }

    async login(data: AuthRequestType): Promise<ApiResponse<UserLoginResponseType>> {
        return await this.request<UserLoginResponseType>(
            `${this.BASE_AUTH_URL}sign-in`,
            {
                method: "POST",
                body: data,
            },
        );
    }
}
