"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/actions/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
	PHONE_INPUT = "phoneInput",
	CHECKBOX = "checkbox",
	DATE_PICKER = "datePicker",
	SELECT = "select",
	SKELETON = "skeleton",
}

const PatientForm = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
		setIsLoading(true);

		try {
			const userData = { name, email, phone };
			const user = await createUser(userData);
			if (user) router.push(`/patients/${user.$id}/register`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
				<section className='mb-12 space-y-4'>
					<h1 className='header'>Hi There! 👋 </h1>
					<p className='text-dark-700'>Schedule your first appointment</p>
				</section>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name='name'
					label='Full Name'
					placeholder='John Doe'
					iconSrc='/assets/icons/user.svg'
					iconAlt='user'
				/>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name='email'
					label='Email'
					placeholder='example@rmqcreative.com'
					iconSrc='/assets/icons/email.svg'
					iconAlt='email'
				/>

				<CustomFormField
					fieldType={FormFieldType.PHONE_INPUT}
					control={form.control}
					name='phone'
					label='Phone Number'
					placeholder='(233) 123 456 789'
				/>

				<SubmitButton isloading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	);
};

export default PatientForm;