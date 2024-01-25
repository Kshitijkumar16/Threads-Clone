import * as z from "zod";

export const ThreadValidation = z.object({
	thread: z.string().min(3, { message: "Minimum 3 characters needed." }),
	accountId: z.string().min(3).max(30),
});


export const CommentValidation = z.object({
	thread: z.string().min(1, { message: "Minimum 1 characters needed." }),
	accountId: z.string().min(3).max(30),
});
