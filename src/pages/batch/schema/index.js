import * as z from 'zod';

export const batchFormSchema = z.object({
    name: z.string().min(6, { message: 'Name must be at least 6 characters long.' })
});
