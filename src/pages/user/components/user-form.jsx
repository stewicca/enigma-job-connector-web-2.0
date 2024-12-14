import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchDebounce } from '@/components/common/search-debounce.jsx';
import { adduserFormSchema, editUserFormSchema } from '@/pages/user/schema/index.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const UserForm = ({ categories, initialValues, onSearchBatch, isLoading, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(initialValues ? editUserFormSchema : adduserFormSchema),
        defaultValues: {
            name: initialValues?.name ?? '',
            email: initialValues?.email ?? '',
            phoneNumber: initialValues?.phoneNumber ?? '',
            password: '',
            role: initialValues?.role ?? '',
            categoryId: initialValues?.categoryId ?? ''
        }
    });

    const handleSubmit = async (values) => {
        if (initialValues) {
            delete values.password;
        }

        if (values.categoryId === '') {
            values.categoryId = null;
        }

        await onSubmit(values);
    }

    return (
        <div className='w-full space-y-4'>
            <h1 className='md:text-lg font-semibold'>{initialValues ? 'Edit User' : 'Add User'}</h1>
            <span className='md:text-sm font-light'>{initialValues ? 'Form untuk mengubah user.' : 'Form untuk menambahkan user.'}</span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='John Doe' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Kolom nama user.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder='johndoe@example.com' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Kolom email user.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phoneNumber'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder='0812345678' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Kolom nomor hp user.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {!initialValues && (
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='********' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Kolom password user.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name='role'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a role'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Admin'>Admin</SelectItem>
                                        <SelectItem value='Trainee'>Trainee</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Kolom pilihan role user.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a batch'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SearchDebounce placeholder='Search Batch...' onChange={onSearchBatch} />
                                        {categories?.map((category) => (
                                            <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Kolom pilihan batch.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={isLoading}>{isLoading ? 'Loading' : 'Submit'}</Button>
                </form>
            </Form>
        </div>
    );
}

UserForm.propTypes = {
    categories: PropTypes.array,
    initialValues: PropTypes.object,
    onSearchBatch: PropTypes.func,
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
}

export default UserForm;
