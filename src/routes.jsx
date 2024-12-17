import { Suspense } from 'react';
import { Layout } from '@/components/layouts/layout.jsx';
import { Loading } from '@/components/common/loading.jsx';
import { Navigate, Outlet, useRoutes } from 'react-router';
import {
    NotFoundPage,
    ErrorPage,
    LoginPage,
    DashboardPage,
    BatchPage,
    ClientPage,
    UserPage,
    AddUserPage,
    EditUserPage,
    TestPage,
    TestTraineesPage,
    AddTestPage,
    EditTestPage,
    ForgotPasswordPage,
    VerifyPage,
    InvalidCodePage
} from '@/pages';

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
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
            errorElement: <ErrorPage />
        },
        {
            path: 'verify',
            element: <VerifyPage />,
            errorElement: <ErrorPage />
        },
        {
            path: 'invalid-code',
            element: <InvalidCodePage />,
            errorElement: <InvalidCodePage />
        },
        {
            path: '/',
            element: <Navigate to='/dashboard' replace />
        },
        {
            path: 'dashboard',
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
                    element: <DashboardPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'batch',
                    element: <BatchPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'client',
                    element: <ClientPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'user',
                    element: <UserPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'user/add',
                    element: <AddUserPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'user/edit/:id',
                    element: <EditUserPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'test',
                    element: <TestPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'test/trainees/:id',
                    element: <TestTraineesPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'test/add',
                    element: <AddTestPage />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'test/edit/:id',
                    element: <EditTestPage />,
                    errorElement: <ErrorPage />
                }
            ]
        }
    ]);
}

export default AppRouter;
