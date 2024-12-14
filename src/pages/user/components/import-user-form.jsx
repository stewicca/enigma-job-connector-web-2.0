import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { importFormSchema } from '@/pages/user/schema/index.js';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const ImportUserForm = ({ onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(importFormSchema)
    });
    
    const handleSubmit = async (values) => {
        await onSubmit(values);
    }
    
    return (
        <DialogContent className='sm:max-w-[425px]'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                    <DialogHeader>
                        <DialogTitle>Import User</DialogTitle>
                        <DialogDescription>
                            Import user from excel file.
                        </DialogDescription>
                    </DialogHeader>
                    <FormField
                        control={form.control}
                        name='file'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>File</FormLabel>
                                <FormControl>
                                    <Input type='file' onChange={(e) => field.onChange(e.target.files[0])} />
                                </FormControl>
                                <FormDescription>
                                    Masukkan file excel untuk mengimport user
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type='submit'>Import</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

ImportUserForm.propTypes = {
    onSubmit: PropTypes.func
}

export default ImportUserForm;
