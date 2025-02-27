import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

// Define the form schema with Zod
const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps
	extends Omit<React.ComponentProps<"form">, "onSubmit"> {
	onSubmitSuccess?: (values: FormValues) => void;
}

export function LoginForm({
	className,
	onSubmitSuccess,
	...props
}: LoginFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: FormValues) {
		console.log(values);
		onSubmitSuccess?.(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("flex flex-col gap-6", className)}
				{...props}
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold text-orange-600">
						Entre na Sua Conta
					</h1>
				</div>
				<div className="grid gap-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<FormControl>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<a
										href="#"
										className="ml-auto text-sm underline-offset-4 hover:underline text-purple-400 hover:text-purple-600"
									>
										Esqueceu a Senha?
									</a>
								</div>
								<FormControl>
									<Input
										id="password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full"
					>
						Login
					</Button>
				</div>
			</form>
		</Form>
	);
}
