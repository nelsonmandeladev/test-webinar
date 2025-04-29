"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCourseAction } from "@/actions/course-actions";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";


export type CourseFormState = {
    errors?: {
        name?: string[];
        date?: string[];
        subject?: string[];
        location?: string[];
        participants?: string[];
        notes?: string[];
        price?: string[];
        trainer_price?: string[];
        trainer_id?: string[];
        _form?: string[];
    };
    success?: boolean;
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Saving…" : "Save course"}
        </Button>
    );
}

export function CourseForm() {

    const handleSave = async (
        prev: CourseFormState,
        formData: FormData
    ): Promise<CourseFormState> => {
        try {
            const result = await createCourseAction(formData);
            const status = result.status;
            // if your service returns the created/updated entity, treat it as success
            if ([200, 201].includes(status)) {
                return { success: true };
            } else if (status === 409) {
                return {
                    errors: { _form: ["A course already exists with the provided name."] },
                };
            } else {
                return {
                    errors: { _form: ["Unknown error occurred. Please try again."] },
                };
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Something went wrong.";
            return { errors: { _form: [msg] } };
        }
    };
    const [formState, formAction] = useActionState(handleSave, {});


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"}>
                    Add new course
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[500px] xl:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        Create new Course
                    </DialogTitle>
                    <DialogDescription>
                        Use this form add new course
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="space-y-5">
                    {/* form‐level errors */}
                    {formState.errors?._form && (
                        <div className="p-2 bg-red-100 border border-red-400 rounded text-red-700">
                            {formState.errors._form.map((e) => (
                                <p key={e}>{e}</p>
                            ))}
                        </div>
                    )}

                    {/* success message */}
                    {formState.success && (
                        <div className="p-2 bg-green-100 border border-green-400 rounded text-green-700">
                            <p>Trainer saved successfully!</p>
                        </div>
                    )}

                    {/* name */}
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-name" className="text-right">
                                Course name
                            </Label>
                            <Input
                                id="course-name"
                                placeholder="Master nextjs SEO"
                                name="name"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-date" className="text-right">
                                Course date
                            </Label>
                            <Input
                                id="course-date"
                                type="datetime-local"
                                name="date"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-subject" className="text-right">
                                Subject
                            </Label>
                            <Input
                                id="course-subject"
                                placeholder="Nextjs"
                                name="subject"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="course-location"
                                placeholder="Yaounde"
                                name="location"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-notes" className="text-right">
                                Note
                            </Label>
                            <Input
                                id="course-notes"
                                placeholder="100"
                                name="notes"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-participant" className="text-right">
                                Total participants
                            </Label>
                            <Input
                                id="course-participant"
                                placeholder="20"
                                type="number"
                                name="participants"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-base-price" className="text-right">
                                Base price in USD
                            </Label>
                            <Input
                                id="course-base-price"
                                placeholder="100"
                                type="number"
                                name="price"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-trainer-price" className="text-right">
                                Trainer price in USD
                            </Label>
                            <Input
                                id="course-trainer-price"
                                placeholder="100"
                                type="number"
                                name="trainer_price"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
