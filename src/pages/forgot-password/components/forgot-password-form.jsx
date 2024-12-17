import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordFormSchema } from '@/pages/forgot-password/schema/index.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const ForgotPasswordForm = ({ isLoading, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Forgot your password?</h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='you@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Sending to Email...' : 'Reset Password'}
                        </Button>
                    </form>
                </Form>
                <div className='mt-4 text-center text-sm'>
                    <Link to='/login' className='text-blue-600 hover:underline'>Back to login</Link>
                </div>
            </div>
        </div>
    );
}

ForgotPasswordForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
}

export default ForgotPasswordForm;
