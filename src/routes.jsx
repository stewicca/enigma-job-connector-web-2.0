import { useRoutes } from 'react-router';

// Pages
import { LoginPage } from '@/pages';

const AppRouter = () => {
    return useRoutes([
        {
            path: 'login',
            element: <LoginPage />
        }
    ]);
}

export default AppRouter;
