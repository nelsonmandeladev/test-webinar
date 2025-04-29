"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { buildPathNAme, cn } from "@/lib/utils";
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
import { loginAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Type for form state
export type LoginFormState = {
    errors?: {
        username?: string[];
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
            {pending ? "Logging in..." : "Login"}
        </Button>
    );
}

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    // Wrapper around the loginAction with proper HTTP status handling
    const loginWithFormState = async (
        prevState: LoginFormState,
        formData: FormData
    ): Promise<LoginFormState> => {
        try {
            const result = await loginAction(formData);
            const status = result.status;
            if (status === 200) {
                toast.success("Login success, welcome back!", {
                    duration: 5000,
                    position: "top-center"
                });
                router.push("/")
                return { success: true };
            } else if (status === 401 || status === 403 || status === 404) {
                return {
                    errors: {
                        _form: ["Invalid username or password."]
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
    const [formState, formAction] = useActionState(loginWithFormState, {});
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials below to access your account
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
                                    <p>Login successful! Redirecting...</p>
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="email"
                                    type="email"
                                    placeholder="user@webinar.test"
                                    required
                                />
                                {formState.errors?.username && (
                                    <p className="text-sm text-red-500">
                                        {formState.errors.username.join(", ")}
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
                                    placeholder="Enter your password"
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
                            Don&apos;t have an account?{' '}
                            <Link href={buildPathNAme(currentLocale, "/register")} className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
