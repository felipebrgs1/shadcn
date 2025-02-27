import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2 rounded">
			<div className="bg-orange-400 relative hidden lg:block rounded">
				<h1 className="m-4 font-medium text-white">Voz Educa</h1>
			</div>
			<div className="flex flex-col gap-4 p-6 md:p-10 rounded bg-gray-50">
				<div className="flex justify-center gap-2 md:justify-start"></div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}
