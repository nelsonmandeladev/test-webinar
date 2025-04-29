"use server";

import { validateFormData } from "@/lib/utils";
import { TrainerFormSchema } from "@/schemas";
import { TrainerServices } from "@/services/trainer-services";
import { revalidateTag } from "next/cache";

export async function createTrainerAction(formData: FormData) {
    try {
        const validatedData = validateFormData(formData, TrainerFormSchema);
        const { create } = new TrainerServices();
        const response = await create(validatedData);
        if ([200, 201].includes(response.status)) {
            revalidateTag("trainers-list")
        }
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Trainer creation fail, please try again letter");
    }
}

export async function listTrainingAction() {
    const { list } = new TrainerServices();
    return await list();
}