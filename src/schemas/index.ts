import { z } from "zod";

// Validation schemas
export const RegisterSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
});

export const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required")
});


export const TrainerFormSchema = z.object({
    name: z.string(),
    training_subjects: z.array(z.string()),
    location: z.string(),
    email: z.string().email("Please enter a valid email address")
});

export const CourseFormSchema = z.object({
    name: z.string(),
    date: z.string(),
    subject: z.string(),
    location: z.string(),
    participants: z.string(),
    notes: z.string(),
    price: z.string(),
    trainer_price: z.string(),
    trainer_id: z.string().optional()
});
export const AssignRemoveTrainerFormSchema = z.object({
    courseId: z.string(),
    trainerId: z.string(),
});

export type CourseFormType = z.infer<typeof CourseFormSchema>;
export type TrainerFormType = z.infer<typeof TrainerFormSchema>;
export type AssignRemoveTrainerFormType = z.infer<typeof AssignRemoveTrainerFormSchema>;