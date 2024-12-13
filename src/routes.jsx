import { Suspense } from 'react';
import { Layout } from '@/components/layouts/layout.jsx';
import { Loading } from '@/components/common/loading.jsx';
import { Navigate, Outlet, useRoutes } from 'react-router';
import { NotFoundPage, ErrorPage, LoginPage, DashboardPage, BatchPage, ClientPage } from '@/pages';

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
                <Suspense fallback={<Loading />}>
                    <Layout>
                        <Outlet />
                    </Layout>
                </Suspense>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />
                },
                {
                    path: 'batch',
                    element: <BatchPage />
                },
                {
                    path: 'client',
                    element: <ClientPage />
                }
            ]
        }
    ]);
}

export default AppRouter;
