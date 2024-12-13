import PropTypes from 'prop-types';
import { Separator } from '@/components/ui/separator';
import { useJwtDecode } from '@/hooks/use-jwt-decode.js';
import { SidebarComponent } from '@/components/common/sidebar.jsx';
import { generateBreadcrumbs } from '@/lib/generate-breadcrumbs.js';
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
    const breadcrumbs = generateBreadcrumbs();

    return (
        <SidebarProvider>
            <SidebarComponent items={role === 'SuperAdmin' ? superAdminItems : adminItems} />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator orientation='vertical' className='mr-2 h-4' />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((crumb, index) => (
                                <div key={index} className='flex items-center gap-2'>
                                    <BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 ? (
                                            <BreadcrumbLink href={crumb.url}>{crumb.title}</BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbs.length - 1 && (
                                        <BreadcrumbSeparator />
                                    )}
                                </div>
                            ))}
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
