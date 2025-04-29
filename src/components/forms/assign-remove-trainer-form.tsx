"use client";

import React, { Fragment, useActionState } from 'react'
import { Button } from '../ui';
import { assignTrainerCoursesAction } from '@/actions/course-actions';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

export type AssignRemoveFormState = {
    errors?: {
        courseId?: string[];
        trainerId?: string[];
        _form?: string[];
    };
    success?: boolean;
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Assigning..." : "Assign Trainer"}
        </Button>
    );
}

interface AssignRemoveTrainerFormProps {
    course: CourseType,
    trainers: TrainerType[];
}
export function AssignRemoveTrainerForm(props: AssignRemoveTrainerFormProps) {
    const { course, trainers } = props;
    // wrap the server action to map exceptions → formState
    const handleSave = async (
        prev: AssignRemoveFormState,
        formData: FormData
    ): Promise<AssignRemoveFormState> => {
        try {
            formData.append("courseId", course.id)
            const result = await assignTrainerCoursesAction(formData);
            const status = result.status;
            // if your service returns the created/updated entity, treat it as success
            if ([200, 201].includes(status)) {
                toast.success("Trainer assigned successfully");
                return { success: true };
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
        <Fragment>
            {course.trainer ? (
                <Button variant="secondary">Remove Trainer</Button>
            ) : (
                <form action={formAction} className='space-y-1.5'>
                    <div className="flex items-center space-x-2">
                        <select name='trainerId' className="border border-gray-300 px-4 py-2 rounded-lg">
                            <option value="">Select Trainer</option>
                            {trainers.map((trainer) => (
                                <option key={trainer.id} value={trainer.id}>
                                    {trainer.name}
                                </option>
                            ))}
                        </select>
                        <SubmitButton />
                    </div>
                    {formState.errors?._form && (
                        <p className=" text-red-700 text-xs">
                            {formState.errors._form.map((e) => (
                                <p key={e}>{e}</p>
                            ))}
                        </p>
                    )}
                </form>
            )}
        </Fragment>
    )
}
