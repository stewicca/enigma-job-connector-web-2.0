import { AlertCircle } from 'lucide-react';
import { useRouteError } from 'react-router';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/hooks/use-router.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ErrorPage = () => {
    const router = useRouter();
    const error = useRouteError();

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <AlertCircle className='h-5 w-5 text-red-500' />
                        Oops! An Error Occurred
                    </CardTitle>
                    <CardDescription>Something went wrong. We&#39;re sorry for the inconvenience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-sm text-muted-foreground'>
                        {error.statusText || error.message}
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.replace('/')} className='w-full'>
                        Go back to homepage
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ErrorPage;
