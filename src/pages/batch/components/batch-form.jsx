import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { batchFormSchema } from '@/pages/batch/schema/index.js';
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const BatchForm = ({ onSubmit, batch }) => {
    const form = useForm({
        resolver: zodResolver(batchFormSchema),
        defaultValues: {
            name: batch?.name ?? ''
        }
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
        form.reset({ name: '' });
    }

    return (
        <SheetContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <SheetHeader>
                        <SheetTitle>{batch ? 'Edit Batch' : 'Add Batch'}</SheetTitle>
                        <SheetDescription>
                            {batch ? 'Form untuk mengubah batch.' : 'Form untuk menambahkan batch.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className='py-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Batch</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Jakarta Batch #1' {...field} className='col-span-3' />
                                    </FormControl>
                                    <FormDescription>
                                        Kolom nama batch.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type='submit'>{batch ? 'Edit Batch' : 'Add Batch'}</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    );
}

BatchForm.propTypes = {
    onSubmit: PropTypes.func,
    batch: PropTypes.object
}

export default BatchForm;
