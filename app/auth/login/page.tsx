"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCredentials } from "@/store/authSlice";
import { AxiosError } from "axios";
import Link from "next/link";
import api from "@/lib/axios";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>({ resolver: zodResolver(loginSchema) });

	const [apiError, setApiError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Clear API error when user starts typing
	const watchedEmail = watch("email");
	const watchedPassword = watch("password");

	useEffect(() => {
		 setApiError(null);
	}, [watchedEmail, watchedPassword]);

	const onSubmit: SubmitHandler<FormData> = async (requestData) => {
		setIsLoading(true);
		setApiError(null);

		try {
			const response = await api.post("/auth/login", requestData);
			const { status, data } = response.data;

			if (status === "success") {
				dispatch(
					setCredentials({
						user: data.user,
						tokenType: data.token_type,
						expiresIn: data.expires_in,
					})
				);
				router.replace("/dashboard");
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError && err.response) {
				const { status, data } = err.response;

				if (status === 422 && data.errors) {
					const firstError = Object.values(data.errors).flat()[0] as string;
					setApiError(firstError || "Validation error");
				} else {
					setApiError(data.message || "The provided email or password is incorrect.");
				}
			} else {
				setApiError("Network error, please try again");
				console.log("apiError", apiError);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
			<form onSubmit={handleSubmit(onSubmit)} className="m-auto h-fit w-full max-w-sm p-0.5 shadow-md md:bg-card md:rounded-[calc(var(--radius)+.125rem)] md:border">
				<div className="p-8 pb-6">
					<div>
						<Link href="/" aria-label="go home">
							<Logo />
						</Link>
						<h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to SeatTracker</h1>
						<p className="text-sm">Welcome back! Sign in to continue</p>

						{/* API Error */}
						{apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
					</div>

					<hr className="my-4 border-dashed" />

					<div className="space-y-6">
						{/* Email */}
						<div className="space-y-2">
							<Label htmlFor="email" className="block text-sm">
								Email
							</Label>
							<Input {...register("email")} id="email" type="email" placeholder="Enter your email" />
							{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
						</div>

						{/* Password */}
						<div className="space-y-0.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="password" className="text-sm">
									Password
								</Label>
								<Button asChild variant="link" size="sm">
									<Link href="/auth/forgotpassword" className="link intent-info variant-ghost text-sm">
										Forgot your Password?
									</Link>
								</Button>
							</div>
							<div className="relative">
								<Input {...register("password")} id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
						</div>

						{/* Submit */}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Signing In..." : "Sign In"}
						</Button>
					</div>
				</div>

				<div className="p-3">
					<p className="text-accent-foreground text-center text-sm">
						Don&apos;t have an account?
						<Button asChild variant="link" className="px-2">
							<Link href="#">Create account</Link>
						</Button>
					</p>
				</div>
			</form>
		</section>
	);
}
