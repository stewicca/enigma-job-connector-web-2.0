import PropTypes from 'prop-types';
import { Separator } from '@/components/ui/separator';
import { useJwtDecode } from '@/hooks/use-jwt-decode.js';
import { SidebarComponent } from '@/components/common/sidebar.jsx';
import { BriefcaseBusiness, Group, Home, NotebookPen, Users } from 'lucide-react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.jsx';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const superAdminItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'Batch',
        url: '/dashboard/batch',
        icon: Group,
    },
    {
        title: 'User',
        url: '/dashboard/user',
        icon: Users,
    },
    {
        title: 'Client',
        url: '/dashboard/client',
        icon: BriefcaseBusiness,
    }
]

const adminItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'Test / Interview',
        url: '/dashboard/test',
        icon: NotebookPen,
    }
]

export const Layout = ({ children }) => {
    const { role } = useJwtDecode();

    return (
        <SidebarProvider>
            <SidebarComponent items={role === 'SuperAdmin' ? superAdminItems : adminItems} />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator orientation='vertical' className='mr-2 h-4' />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className='hidden md:block'>
                                <BreadcrumbLink href='#'>
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className='hidden md:block' />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
}
