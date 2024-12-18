import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const StatsCard = ({ title, value, icon }) => (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold'>{value}</div>
        </CardContent>
    </Card>
);

StatsCard.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.node
}

export default StatsCard;
