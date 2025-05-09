
declare type ApiResponse<T> = {
    status: number;
    response: T;
};

declare type ListApiResponse<T> = {
    data: T[];
    meta: {
        currentPage: number;
        limit: number;
        totalPage: number;
        total: number;
    };
};

declare type AuthRequestType = {
    email: string;
    password: string;
}


declare type UserLoginResponseType = {
    user: {
        id: string;
        email: string;
        lastLogin: string;
        createdAt: string;
        updatedAt: string;
    };
    access_token: string;
    refresh_token: string;
};


declare type TrainerType = {
    id: string;
    name: string;
    training_subjects: string[];
    location: string;
    email: string;
    user_id: string;
    createdAt: string,
    updatedAt: string,
};


declare type CourseType = {
    id: string;
    name: string;
    date: string;
    subject: string;
    location: string;
    participants: number;
    notes: string;
    price: number;
    trainer_price: number;
    trainer_id: string | null;
    user_id: string;
    trainer: TrainerType | null;
};