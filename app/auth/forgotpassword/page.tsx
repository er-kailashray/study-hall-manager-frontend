import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
	return (
		<section className="flex min-h-screen px-4 py-16 md:py-32 dark:bg-transparent">
			<form action="" className="m-auto h-fit w-full max-w-sm p-0.5 shadow-md md:bg-card md:rounded-[calc(var(--radius)+.125rem)] md:border">
				<div className="p-8 pb-6">
					<div>
						<Link href="/" aria-label="go home">
							<Logo />
						</Link>
						<h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
						<p className="text-sm">Enter your email to receive a reset link</p>
					</div>

                    <hr className="my-4 border-dashed" />

					<div className="mt-6 space-y-6">
						<div className="space-y-2">
							<Label htmlFor="email" className="block text-sm">
								Email
							</Label>
							<Input type="email" required name="email" id="email" placeholder="name@example.com" />
						</div>

						<Button className="w-full">Send Reset Link</Button>
					</div>

					<div className="mt-6 text-center">
						<p className="text-muted-foreground text-sm">We&apos;ll send you a link to reset your password.</p>
					</div>
				</div>

				<div className="p-3">
					<p className="text-accent-foreground text-center text-sm">
						Remembered your password?
						<Button asChild variant="link" className="px-2">
							<Link href="/auth/login">Log in</Link>
						</Button>
					</p>
				</div>
			</form>
		</section>
	);
}
