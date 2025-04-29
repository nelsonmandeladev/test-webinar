"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { registerAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";

// Type for form state
export type FormState = {
    errors?: {
        email?: string[];
        password?: string[];
        _form?: string[];
    };
    success?: boolean;
};

// Submit button with loading state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Registering..." : "Register"}
        </Button>
    );
}

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    // Wrapper around the registerAction with proper HTTP status handling
    const registerWithFormState = async (
        prevState: FormState,
        formData: FormData
    ): Promise<FormState> => {
        try {
            const result = await registerAction(formData);
            const status = result.status;
            if (status === 200 || status === 201) {
                toast.success("Registration success", {
                    duration: 5000,
                    position: "top-center"
                });
                router.push("/login")
                return { success: true };
            } else if (status === 409) {
                return {
                    errors: {
                        _form: ["User already exists."]
                    }
                };
            } else {
                return {
                    errors: {
                        _form: ["Unknown error occurred. Please try again."]
                    }
                };
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    errors: {
                        _form: [error.message]
                    }
                };
            }
            return {
                errors: {
                    _form: ["Something went wrong. Please try again."]
                }
            };
        }
    };

    // Initialize form state using useActionState
    const [formState, formAction] = useActionState(registerWithFormState, {});

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your information below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="flex flex-col gap-6">
                            {formState.errors?._form && (
                                <div className="p-2 bg-red-100 border border-red-400 rounded text-red-700">
                                    {formState.errors._form.map((error) => (
                                        <p key={error}>{error}</p>
                                    ))}
                                </div>
                            )}

                            {formState.success && (
                                <div className="p-2 bg-green-100 border border-green-400 rounded text-green-700">
                                    <p>Registration successful! You can now login.</p>
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="user@webinar.com"
                                    required
                                />
                                {formState.errors?.email && (
                                    <p className="text-sm text-red-500">
                                        {formState.errors.email.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Enter a password"
                                />
                                {formState.errors?.password && (
                                    <p className="text-sm text-red-500">
                                        {formState.errors.password.join(", ")}
                                    </p>
                                )}
                            </div>

                            <SubmitButton />
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
