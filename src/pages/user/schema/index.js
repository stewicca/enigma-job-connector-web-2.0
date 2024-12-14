import * as z from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

export const importFormSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => !!file, 'File is required.')
        .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), 'Only Excel files are accepted.')
});

export const adduserFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    phoneNumber: z.string().min(11, 'Phone number must be at least 11 characters.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    role: z.enum(['Admin', 'Trainee'], { required_error: 'Please select a role.' }),
    categoryId: z.string().nullish()
});

export const editUserFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    phoneNumber: z.string().min(11, 'Phone number must be at least 11 characters.'),
    role: z.enum(['Admin', 'Trainee'], { required_error: 'Please select a role.' }),
    categoryId: z.string().nullish()
});
