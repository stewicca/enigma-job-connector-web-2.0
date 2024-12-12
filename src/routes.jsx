import { Suspense } from 'react';
import { Layout } from '@/components/layouts/layout.jsx';
import { Loading } from '@/components/common/loading.jsx';
import { Navigate, Outlet, useRoutes } from 'react-router';
import { NotFoundPage, ErrorPage, LoginPage } from '@/pages';

const AppRouter = () => {
    return useRoutes([
        {
            path: '*',
            element: <Navigate to='/404' replace />
        },
        {
            path: '/404',
            element: <NotFoundPage />
        },
        {
            path: 'login',
            element: <LoginPage />,
            errorElement: <ErrorPage />
        },
        {
            path: '/',
            element: <Navigate to='/dashboard' replace />
        },
        {
            path: '/dashboard',
            element: (
                <Layout>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </Layout>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <div></div>
                }
            ]
        }
    ]);
}

export default AppRouter;
