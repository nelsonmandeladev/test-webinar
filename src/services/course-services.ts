import { CourseFormType, TrainerFormType } from "@/schemas";
import { BaseApiService } from "./base-service";

export class CourseServices extends BaseApiService {
    private BASE_AUTH_URL = "courses/";
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.assignTrainer = this.assignTrainer.bind(this);
    }

    async create(data: CourseFormType): Promise<ApiResponse<CourseType>> {
        return await this.request<CourseType>(
            `${this.BASE_AUTH_URL}`,
            {
                method: "POST",
                body: {
                    ...data,
                    participants: Number(data.participants),
                    price: Number(data.price),
                    trainer_price: Number(data.trainer_price),
                },
                authenticated: true,
            },
        );
    }
    async update(data: CourseFormType, trainerId: string): Promise<ApiResponse<CourseType>> {
        return await this.request<CourseType>(
            `${this.BASE_AUTH_URL}/${trainerId}`,
            {
                method: "POST",
                body: data,
                authenticated: true,
            },
        );
    }

    async list(): Promise<ApiResponse<ListApiResponse<CourseType>>> {
        return await this.request<ListApiResponse<CourseType>>(
            `${this.BASE_AUTH_URL}`,
            {
                method: "GET",
                authenticated: true,
                query: {
                    page: 1,
                    limit: 200
                },
                tag: "courses-list"
            },
        );
    }

    async assignTrainer(courseId: string, trainerId: string) {
        return await this.request<CourseType>(
            `${this.BASE_AUTH_URL}${courseId}/trainer/${trainerId}/assign`,
            {
                method: "GET",
                authenticated: true,
            },
        );
    }
}
