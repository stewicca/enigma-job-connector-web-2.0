import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/404'));
const ErrorPage = lazy(() => import('@/pages/error'));
const LoginPage = lazy(() => import('@/pages/login'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const BatchPage = lazy(() => import('@/pages/batch'));

export {
    NotFoundPage,
    ErrorPage,
    LoginPage,
    DashboardPage,
    BatchPage
}
