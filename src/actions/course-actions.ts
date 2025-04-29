"use server";

import { validateFormData } from "@/lib/utils";
import { AssignRemoveTrainerFormSchema, CourseFormSchema } from "@/schemas";
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

export async function listCoursesAction() {
    const { list } = new CourseServices();
    return await list();
}


export async function assignTrainerCoursesAction(formData: FormData) {

    try {
        const validatedData = validateFormData(formData, AssignRemoveTrainerFormSchema);
        const { assignTrainer } = new CourseServices();
        const response = await assignTrainer(validatedData.courseId, validatedData.trainerId);
        if (response.status === 200) {
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