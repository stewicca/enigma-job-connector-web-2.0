import { Suspense } from 'react';
import AppRouter from '@/routes.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/toaster.jsx';
import { Loading } from '@/components/common/loading.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
                <Toaster />
            </QueryClientProvider>
        </Suspense>
    );
}

export default App;
