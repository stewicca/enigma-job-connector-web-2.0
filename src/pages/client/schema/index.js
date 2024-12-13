import * as z from 'zod';

export const clientFormSchema = z.object({
    name: z.string().min(3, { message: 'Client name must be at least 3 characters long.' }),
    address: z.string({ required_error: 'Address is required.' })
});
