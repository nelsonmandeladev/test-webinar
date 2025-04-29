"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createTrainerAction } from "@/actions/trainer-actions";

const SUBJECTS = [
    { id: "reactjs", label: "ReactJS" },
    { id: "nextjs", label: "NextJS" },
    { id: "seo", label: "SEO" },
    { id: "python", label: "Python" },
    { id: "crypto", label: "Crypto" },
    { id: "web-design", label: "Web design" },
] as const;

export type TrainerFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        location?: string[];
        subjects?: string[];
        _form?: string[];
    };
    success?: boolean;
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save trainer"}
        </Button>
    );
}

interface TrainerFormProps {
    trainer?: TrainerType;
}

export function TrainerForm({ trainer }: TrainerFormProps) {
    // wrap the server action to map exceptions → formState
    const handleSave = async (
        prev: TrainerFormState,
        formData: FormData
    ): Promise<TrainerFormState> => {
        try {
            const result = await createTrainerAction(formData);
            const status = result.status;
            // if your service returns the created/updated entity, treat it as success
            if ([200, 201].includes(status)) {
                return { success: true };
            } else if (status === 409) {
                return {
                    errors: { _form: ["A trainer already exists with the provided email."] },
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
                <Button size="lg">
                    {trainer ? "Edit trainer" : "Add new trainer"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[500px] xl:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {trainer ? "Edit trainer" : "Create new trainer"}
                    </DialogTitle>
                    <DialogDescription>
                        {trainer
                            ? "Update the details for this trainer"
                            : "Use this form to add a new trainer"}
                    </DialogDescription>
                </DialogHeader>

                <form action={formAction} className="space-y-4">
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
                    <div className="grid gap-2">
                        <Label htmlFor="trainer-name">Trainer name</Label>
                        <Input
                            id="trainer-name"
                            name="name"
                            defaultValue={trainer?.name}
                            placeholder="Janette Doe"
                        />
                        {formState.errors?.name && (
                            <p className="text-sm text-red-500">
                                {formState.errors.name.join(", ")}
                            </p>
                        )}
                    </div>

                    {/* email */}
                    <div className="grid gap-2">
                        <Label htmlFor="trainer-email">Trainer email</Label>
                        <Input
                            id="trainer-email"
                            name="email"
                            type="email"
                            defaultValue={trainer?.email}
                            placeholder="janette@does.com"
                        />
                        {formState.errors?.email && (
                            <p className="text-sm text-red-500">
                                {formState.errors.email.join(", ")}
                            </p>
                        )}
                    </div>

                    {/* location */}
                    <div className="grid gap-2">
                        <Label htmlFor="trainer-location">Location</Label>
                        <Input
                            id="trainer-location"
                            name="location"
                            defaultValue={trainer?.location}
                            placeholder="Yaoundé"
                        />
                        {formState.errors?.location && (
                            <p className="text-sm text-red-500">
                                {formState.errors.location.join(", ")}
                            </p>
                        )}
                    </div>

                    {/* subjects */}
                    <div>
                        <Label className="block mb-1">Training subjects</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {SUBJECTS.map((s) => (
                                <div key={s.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={s.id}
                                        name="training_subjects"
                                        value={s.id}
                                        defaultChecked={
                                            trainer?.training_subjects?.includes(s.id) || false
                                        }
                                    />
                                    <Label htmlFor={s.id}>{s.label}</Label>
                                </div>
                            ))}
                        </div>
                        {formState.errors?.subjects && (
                            <p className="text-sm text-red-500">
                                {formState.errors.subjects.join(", ")}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="flex justify-end">
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
