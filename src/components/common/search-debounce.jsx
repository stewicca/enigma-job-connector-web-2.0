import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const SearchDebounce = ({ placeholder, onChange}) => (
    <div className='w-full'>
        <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400'/>
            <Input placeholder={placeholder ?? 'Search...'} onChange={(e) => onChange(e.target.value)} className='pl-10 pr-4' />
        </div>
    </div>
);

SearchDebounce.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}
