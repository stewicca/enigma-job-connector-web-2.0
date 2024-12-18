import PropTypes from 'prop-types';
import { BriefcaseBusiness, Group, Users } from 'lucide-react';
import StatsCard from '@/pages/dashboard/components/stats-card.jsx';

const Stats = ({ batch, user, client }) => {
    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <StatsCard
                title='Total Batch'
                value={batch.toString()}
                icon={<Group className='h-4 w-4 text-muted-foreground'/>}
            />
            <StatsCard
                title='Total User'
                value={user.toString()}
                icon={<Users className='h-4 w-4 text-muted-foreground'/>}
            />
            <StatsCard
                title='Total Client'
                value={client.toString()}
                icon={<BriefcaseBusiness className='h-4 w-4 text-muted-foreground'/>}
            />
        </div>
    );
}

Stats.propTypes = {
    batch: PropTypes.number,
    user: PropTypes.number,
    client: PropTypes.number
}

export default Stats;
