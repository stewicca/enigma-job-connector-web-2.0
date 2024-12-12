import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/404'));
const ErrorPage = lazy(() => import('@/pages/error'));
const LoginPage = lazy(() => import('@/pages/login'));

export {
    NotFoundPage,
    ErrorPage,
    LoginPage
}
