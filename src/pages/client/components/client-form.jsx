import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientFormSchema } from '@/pages/client/schema/index.js';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const ClientForm = ({ onSubmit, client, isLoading }) => {
    const form = useForm({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            name: client?.name ?? '',
            address: client?.address ?? ''
        }
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
        form.reset({
            name: '',
            address: ''
        });
    }

    useEffect(() => {
        form.reset({
            name: client?.name ?? '',
            address: client?.address ?? ''
        });
    }, [client]);

    return (
        <SheetContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <SheetHeader>
                        <SheetTitle>{client ? 'Edit Client' : 'Add Client'}</SheetTitle>
                        <SheetDescription>
                            {client ? 'Form to edit a client.' : 'Form to add a new client.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className='flex flex-col gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='OCBC' {...field} className='col-span-3' />
                                    </FormControl>
                                    <FormDescription>
                                        Field for the client's name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder='South Jakarta' {...field} className='col-span-3' />
                                    </FormControl>
                                    <FormDescription>
                                        Field for the client's address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <SheetFooter>
                        <Button type='submit'>{isLoading ? 'Loading...' : client ? 'Edit Client' : 'Add Client'}</Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    );
}

ClientForm.propTypes = {
    onSubmit: PropTypes.func,
    client: PropTypes.object,
    isLoading: PropTypes.bool
}

export default ClientForm;
