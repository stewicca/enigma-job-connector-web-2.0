import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { batchFormSchema } from '@/pages/batch/schema/index.js';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const BatchForm = ({ onSubmit, batch, isLoading }) => {
    const form = useForm({
        resolver: zodResolver(batchFormSchema),
        defaultValues: {
            name: batch?.name ?? ''
        }
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
        form.reset({
            name: ''
        });
    }

    useEffect(() => {
        form.reset({
            name: batch?.name ?? ''
        });
    }, [batch]);

    return (
        <SheetContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <SheetHeader>
                        <SheetTitle>{batch ? 'Edit Batch' : 'Add Batch'}</SheetTitle>
                        <SheetDescription>
                            {batch ? 'Form to edit a batch.' : 'Form to add a new batch.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className='py-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Batch Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Jakarta Batch #1' {...field} className='col-span-3' />
                                    </FormControl>
                                    <FormDescription>
                                        Field for the batch name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <SheetFooter>
                        <Button type='submit'>{isLoading ? 'Loading...' : batch ? 'Edit Batch' : 'Add Batch'}</Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    );
}

BatchForm.propTypes = {
    onSubmit: PropTypes.func,
    batch: PropTypes.object,
    isLoading: PropTypes.bool
}

export default BatchForm;
