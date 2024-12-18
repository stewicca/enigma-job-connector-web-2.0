import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Enigma from '@/components/common/enigma.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/pages/login/schema/index.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const LoginForm = ({ isLoading, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md'>
                <div className='w-fit mx-auto'>
                    <Enigma size='20' />
                </div>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Welcome Back</h1>
                    <p className='mt-2 text-sm text-gray-600'>Please sign in to your account</p>
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
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='••••••••' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </form>
                </Form>
                <div className='mt-4 text-center text-sm'>
                    <Link to='/forgot-password' className='text-blue-600 hover:underline'>Forgot your password?</Link>
                </div>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
}

export default LoginForm;
