"use client";

import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";

import Image from "next/image";

import { useUploadThing } from "@/lib/uploadthing";

import { isBase64Image } from "@/lib/utils";

interface Props {
	user: {
		id: string;
		objectId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing("media");

	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			profile_photo: user?.image || "",
			name: user?.name || "",
			username: user?.username || "",
			bio: user?.bio || "",
		},
	});

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();
		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));

			if (!file.type.includes("image")) return;
			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || "";
				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};

	const onSubmit = async (values: z.infer<typeof UserValidation>) => {
		const blob = values.profile_photo;

		const hasImageChanged = isBase64Image(blob);

		if (hasImageChanged) {
			const imgRes = await startUpload(files);

			if (imgRes && imgRes[0].fileUrl) {
				values.profile_photo = imgRes[0].fileUrl;
			}
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-start gap-10'
			>
				<FormField
					control={form.control}
					name='profile_photo'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='account-form_image-label'>
								{field.value ? (
									<Image
										src={field.value}
										width={96}
										height={96}
										priority
										className='object-contain rounded-full'
										alt='profile photo'
									/>
								) : (
									<Image
										src='/assets/profile.svg'
										width={24}
										height={24}
										className='object-contain'
										alt='profile photo'
									/>
								)}
							</FormLabel>
							<FormControl className='flex-1 text-gray-200 text-base-semibold'>
								<Input
									placeholder='upload a photo'
									type='file'
									accept='image/*'
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col w-full gap-3'>
							<FormLabel className=' text-light-2 text-base-semibold'>
								Name
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='account-form_input no-focus'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='flex flex-col w-full gap-3'>
							<FormLabel className=' text-light-2 text-base-semibold'>
								Username
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='account-form_input no-focus'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem className='flex flex-col w-full gap-3'>
							<FormLabel className='text-white text-base-semibold'>
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									rows={10}
									className='account-form_input no-focus'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='bg-primary-500'
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;