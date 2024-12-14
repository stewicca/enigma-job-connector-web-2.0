import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/404'));
const ErrorPage = lazy(() => import('@/pages/error'));
const LoginPage = lazy(() => import('@/pages/login'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const BatchPage = lazy(() => import('@/pages/batch'));
const ClientPage = lazy(() => import('@/pages/client'));
const UserPage = lazy(() => import('@/pages/user'));
const AddUserPage = lazy(() => import('@/pages/user/pages/add-user.jsx'));
const EditUserPage = lazy(() => import('@/pages/user/pages/edit-user.jsx'));

export {
    NotFoundPage,
    ErrorPage,
    LoginPage,
    DashboardPage,
    BatchPage,
    ClientPage,
    UserPage,
    AddUserPage,
    EditUserPage
}
