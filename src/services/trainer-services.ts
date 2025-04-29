import { TrainerFormType } from "@/schemas";
import { BaseApiService } from "./base-service";

export class TrainerServices extends BaseApiService {
    private BASE_AUTH_URL = "trainers/";
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
    }

    async create(data: TrainerFormType): Promise<ApiResponse<TrainerType>> {
        return await this.request<TrainerType>(
            `${this.BASE_AUTH_URL}`,
            {
                method: "POST",
                body: data,
                authenticated: true,
            },
        );
    }
    async update(data: TrainerFormType, trainerId: string): Promise<ApiResponse<TrainerType>> {
        return await this.request<TrainerType>(
            `${this.BASE_AUTH_URL}/${trainerId}`,
            {
                method: "POST",
                body: data,
                authenticated: true,
            },
        );
    }

    async list(): Promise<ApiResponse<ListApiResponse<TrainerType>>> {
        return await this.request<ListApiResponse<TrainerType>>(
            `${this.BASE_AUTH_URL}`,
            {
                method: "GET",
                authenticated: true,
                query: {
                    page: 1,
                    limit: 200
                },
                tag: "trainers-list"
            },
        );
    }
}
