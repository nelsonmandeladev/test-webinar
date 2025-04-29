
declare type ApiResponse<T> = {
    status: number;
    response: T;
};

declare type ListApiResponse<T> = {
    datas: T[];
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