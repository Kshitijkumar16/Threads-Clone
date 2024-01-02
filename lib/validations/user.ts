import * as z from 'zod';

export const UserValidation = z.object({
   profile_photo: z.string().url().nonempty(),
   name: z.string().min(3, {message: "Minimum 3 characters needed."}).max(20, {message: "Maximum 20 characters allowed."}),
   username: z.string().min(3, {message: "Minimum 3 characters needed."}).max(20, {message: "Maximum 20 characters allowed"}),
   bio: z.string().min(3).max(1000),
})