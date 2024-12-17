import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils.js';
import { useState, useEffect } from 'react';
import { CalendarIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from '@/components/ui/calendar.jsx';
import { useFieldArray, useForm } from 'react-hook-form';
import { testFormSchema } from '@/pages/test/schema/index.js';
import { SearchDebounce } from '@/components/common/search-debounce.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const TestForm = ({ users, clients, initialValues, onUserSearch, onClientSearch, onSubmit }) => {
    const [selectedTrainees, setSelectedTrainees] = useState([]);

    const form = useForm({
        resolver: zodResolver(testFormSchema),
        defaultValues: {
            file: null,
            deadlineDate: initialValues?.deadlineAt ? new Date(initialValues.deadlineAt) : new Date(),
            deadlineTime: initialValues?.deadlineAt ? format(new Date(initialValues.deadlineAt), 'HH:mm') : format(new Date(), 'HH:mm'),
            clientId: initialValues?.clientId ?? '',
            description: initialValues?.description ?? '',
            details: initialValues?.testDetail?.map((detail) => detail.userId) ?? [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'details',
    });

    useEffect(() => {
        if (initialValues?.details) {
            setSelectedTrainees(
                initialValues.testDetail.map((detail) => ({
                    id: detail.userId,
                    name: `${detail.name} | ${detail.email}`,
                }))
            );
        }
    }, [initialValues]);

    const handleAddTrainee = () => {
        append('');
        setSelectedTrainees([...selectedTrainees, { id: '', name: '' }]);
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();

        formData.append('file', values.file);

        formData.append('test', JSON.stringify({
            deadlineAt: `${format(values.deadlineDate, 'yyy-MM-dd')}T${values.deadlineTime}`,
            clientId: values.clientId,
            description: values.description,
            details: values.details,
        }));

        await onSubmit(formData);
    }

    return (
        <div className='w-full space-y-4'>
            <h1 className='md:text-lg font-semibold'>{initialValues ? 'Edit Test' : 'Add Test'}</h1>
            <span className='md:text-sm font-light'>{initialValues ? 'Form untuk mengubah test.' : 'Form untuk menambahkan test.'}</span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='file'
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>File</FormLabel>
                                <FormControl>
                                    <Input {...fieldProps} type='file' placeholder='File Test' accept='image/*, application/pdf' onChange={(e) => onChange(e.target.files && e.target.files[0])} />
                                </FormControl>
                                <FormDescription>
                                    Masukkan file test dalam format pdf atau image.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <FormField
                            control={form.control}
                            name='deadlineDate'
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-2 flex-grow'>
                                    <FormLabel>Deadline Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                    {field.value ? (format(field.value, 'PPP')) : (<span>Pick a date</span>)}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0' align='start'>
                                            <Calendar
                                                mode='single'
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Kolom tanggal deadline.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='deadlineTime'
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-2'>
                                    <FormLabel>Deadline Time</FormLabel>
                                    <FormControl>
                                        <Input type='time' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Kolom jam deadline.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='clientId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a client' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SearchDebounce placeholder='Search Client...' onChange={onClientSearch} />
                                        {clients?.map((client) => (
                                            <SelectItem value={client.id} key={client.id}>{client.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Kolom pilihan client.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-2'>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder='Description' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Kolom description.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <Label className='block mb-2'>Trainees</Label>
                        {fields.map((field, index) => (
                            <FormField
                                key={field.id}
                                control={form.control}
                                name={`details.${index}`}
                                render={({ field }) => (
                                    <FormItem className='flex items-center gap-2'>
                                        <Select
                                            onValueChange={(value) => {
                                                const updatedTrainees = [...selectedTrainees];
                                                updatedTrainees[index] = { id: value, name: users.find((user) => user.id === value)?.name + ' | ' + users.find((user) => user.id === value)?.email || '' };
                                                setSelectedTrainees(updatedTrainees);
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='mt-2'>
                                                    <SelectValue placeholder='Select a trainee'>
                                                        {selectedTrainees[index]?.name}
                                                    </SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SearchDebounce placeholder='Search Trainee...' onChange={onUserSearch} />
                                                {users?.map((user) => (
                                                    <SelectItem value={user.id} key={user.id}>
                                                        {user.name + ' | ' + user.email}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button type='button' variant='destructive' size='icon' onClick={() => remove(index)}>
                                            <X />
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type='button' variant='outline' onClick={handleAddTrainee} className='mt-4'>
                            Add Trainee
                        </Button>
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </div>
    );
}

TestForm.propTypes = {
    users: PropTypes.array,
    clients: PropTypes.array,
    initialFile: PropTypes.any,
    initialValues: PropTypes.object,
    onUserSearch: PropTypes.func,
    onClientSearch: PropTypes.func,
    onSubmit: PropTypes.func
}

export default TestForm;
