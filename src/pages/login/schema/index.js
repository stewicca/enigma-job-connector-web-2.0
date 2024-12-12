import * as z from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    // username: z.string().min(3, { message: 'Username must be at least 3 characters long.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});
