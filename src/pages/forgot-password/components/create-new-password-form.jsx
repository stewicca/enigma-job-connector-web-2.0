import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewPasswordFormSchema } from '@/pages/forgot-password/schema/index.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const CreateNewPasswordForm = ({ isLoading, onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm({
        resolver: zodResolver(createNewPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    const handleSubmit = async (values) => {
        delete values.confirmPassword;
        await onSubmit(values);
    }

    const passwordStrength = (password) => {
        const checks = [
            {regex: /.{8,}/, message: 'At least 8 characters'},
            {regex: /[A-Z]/, message: 'Uppercase letter'},
            {regex: /[a-z]/, message: 'Lowercase letter'},
            {regex: /[0-9]/, message: 'Number'},
            {regex: /[^A-Za-z0-9]/, message: 'Special character'},
        ]

        return checks.map(({regex, message}, index) => (
            <li key={index} className='flex items-center gap-2 text-sm'>
                {regex.test(password) ? (
                    <Check className='h-4 w-4 text-green-500'/>
                ) : (
                    <X className='h-4 w-4 text-red-500'/>
                )}
                {message}
            </li>
        ))
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Create New Password</h1>
                    <p className='mt-2 text-sm text-gray-600'>Please set your new password</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                {...field}
                                                className='pr-10'
                                                placeholder='••••••••'
                                            />
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='sm'
                                                className='absolute right-0 top-0 h-full px-3'
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className='h-4 w-4'/>
                                                ) : (
                                                    <Eye className='h-4 w-4'/>
                                                )}
                                                <span className='sr-only'>
                                                    {showPassword ? 'Hide password' : 'Show password'}
                                                </span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                    <ul className='mt-2 space-y-1'>
                                        {passwordStrength(field.value)}
                                    </ul>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                {...field}
                                                className='pr-10'
                                                placeholder='••••••••'
                                            />
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='sm'
                                                className='absolute right-0 top-0 h-full px-3'
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className='h-4 w-4'/>
                                                ) : (
                                                    <Eye className='h-4 w-4'/>
                                                )}
                                                <span className='sr-only'>
                                                    {showConfirmPassword ? 'Hide password' : 'Show password'}
                                                </span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Creating new password...' : 'Create New Password'}
                        </Button>
                    </form>
                </Form>
                <div className='mt-4 text-center text-sm'>
                    <Link to='/login' className='text-blue-600 hover:underline'>Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

CreateNewPasswordForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
}

export default CreateNewPasswordForm;
