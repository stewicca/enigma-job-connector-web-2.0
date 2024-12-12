import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

export const SearchComponent = ({ placeholder, value, onSubmit }) => {
    const form = useForm({
        defaultValues: {
            searchQuery: value || '',
        },
    });

    const handleSubmit = (values) => {
        onSubmit(values.searchQuery);
    }

    return (
        <div className='w-full max-w-sm'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='searchQuery'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='relative'>
                                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                                        <Input placeholder={placeholder ?? 'Search...'} {...field} className='pl-10 pr-4' />
                                        {field.value && (
                                            <button
                                                type='button'
                                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black'
                                                onClick={() => {
                                                    form.setValue('searchQuery', '');
                                                    onSubmit('');
                                                }}
                                            >
                                                <X className='h-4 w-4' />
                                            </button>
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}

SearchComponent.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSubmit : PropTypes.func
}
