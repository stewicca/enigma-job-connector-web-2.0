import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/hooks/use-router.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const InvalidCodePage = () => {
    const router = useRouter();

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <AlertCircle className='h-5 w-5 text-red-500' />
                        Invalid or Expired Link
                    </CardTitle>
                    <CardDescription>The password reset link you clicked is no longer valid.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-sm text-muted-foreground'>
                        This can happen if the link has expired or has already been used. For security reasons, password reset links are only valid for a limited time.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/forgot-password')} className='w-full'>
                        Try Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default InvalidCodePage;
