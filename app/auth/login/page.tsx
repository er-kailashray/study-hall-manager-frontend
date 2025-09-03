import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
	return (
		<section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
			<form action="" className="m-auto h-fit w-full max-w-sm p-0.5 shadow-md md:bg-card md:rounded-[calc(var(--radius)+.125rem)] md:border">
				<div className="p-8 pb-6">
					<div>
						<Link href="/" aria-label="go home">
							<Logo />
						</Link>
						<h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to SeatTracker</h1>
						<p className="text-sm">Welcome back! Sign in to continue</p>
					</div>

					<hr className="my-4 border-dashed" />

					<div className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="email" className="block text-sm">
								Username
							</Label>
							<Input type="email" required name="email" id="email" />
						</div>

						<div className="space-y-0.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="pwd" className="text-sm">
									Password
								</Label>
								<Button asChild variant="link" size="sm">
									<Link href="/auth/forgotpassword" className="link intent-info variant-ghost text-sm">
										Forgot your Password ?
									</Link>
								</Button>
							</div>
							<Input type="password" required name="pwd" id="pwd" className="input sz-md variant-mixed" />
						</div>

						<Button className="w-full">Sign In</Button>
					</div>
				</div>

				<div className="p-3">
					<p className="text-accent-foreground text-center text-sm">
						Don&apos;t have an account ?
						<Button asChild variant="link" className="px-2">
							<Link href="#">Create account</Link>
						</Button>
					</p>
				</div>
			</form>
		</section>
	);
}
