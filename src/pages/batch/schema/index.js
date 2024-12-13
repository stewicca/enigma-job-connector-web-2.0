import * as z from 'zod';

export const batchFormSchema = z.object({
    name: z.string().min(6, { message: 'Batch name must be at least 6 characters long.' })
});
