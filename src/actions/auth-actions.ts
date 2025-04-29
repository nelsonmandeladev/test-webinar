"use server";

import { validateFormData } from "@/lib/utils";
import { loginSchema, registerSchema } from "@/schemas";
import { AuthService } from "@/services/auth-service";
import { cookies } from "next/headers";

export async function registerAction(formData: FormData) {
    try {
        const validatedData = validateFormData(formData, registerSchema);
        const { register } = new AuthService();
        return await register(validatedData);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Registration failed. Please try again later.");
    }
}

export async function loginAction(formData: FormData) {
    try {
        const validatedData = validateFormData(formData, loginSchema);
        const { login } = new AuthService();
        const result = await login(validatedData);
        const access_token = result.response.access_token;
        if ([200, 201].includes(result.status)) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: 'access_token',
                value: access_token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/"
            });
        }
        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Login failed. Please try again later.");
    }
}


