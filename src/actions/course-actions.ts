"use server";

import { validateFormData } from "@/lib/utils";
import { CourseFormSchema } from "@/schemas";
import { CourseServices } from "@/services/course-services";
import { revalidateTag } from "next/cache";

export async function createCourseAction(formData: FormData) {
    try {
        const validatedData = validateFormData(formData, CourseFormSchema);
        const { create } = new CourseServices();
        const response = await create(validatedData);
        if ([200, 201].includes(response.status)) {
            revalidateTag("courses-list")
        }
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Course creation fail, please try again letter");
    }
}

export async function listTrainingAction() {
    const { list } = new CourseServices();
    return await list();
}