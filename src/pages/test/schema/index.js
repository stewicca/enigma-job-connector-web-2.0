import * as z from 'zod';

const MAX_FILE_SIZE = 200000;
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

export const testFormSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, { message: 'Max file size is 2MB.' })
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), { message: 'Only pdf and image files are accepted.' }),
    deadlineDate: z.date({ required_error: 'Deadline date is required.' }),
    deadlineTime: z.string({ required_error: 'Deadline time is required.' }),
    clientId: z.string({ required_error: 'Client is required.' }),
    description: z.string({ required_error: 'Description is required.' }),
    details: z.array(z.string()).min(1, { message: 'Details must have at least one user ID.' }),
});
