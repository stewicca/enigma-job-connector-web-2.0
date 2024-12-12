import { Suspense } from 'react';
import { BrowserRouter } from 'react-router';

// AppRouter
import AppRouter from '@/routes.jsx';

const App = () => {
    return (
        <Suspense>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
