import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
            <h1 className='text-4xl font-bold mb-4'>404</h1>
            <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
            <p className='text-muted-foreground mb-8 text-center max-w-md'>
                Oops! The page you&#39;re looking for doesn&#39;t exist or has been moved.
            </p>
            <Button asChild>
                <Link to='/'>
                    Return Home
                </Link>
            </Button>
        </div>
    );
}

export default NotFoundPage;
