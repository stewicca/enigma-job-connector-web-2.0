const routeMapping = {
    'dashboard/user/edit/:id': { title: '', param: 'id' },
    'dashboard/test/trainees/:id': { title: '', param: 'id' },
    'dashboard/test/edit/:id': { title: '', param: 'id' },
};

export const generateBreadcrumbs = (pathname, params) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    let currentPath = '';

    pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;

        const matchedRoute = Object.keys(routeMapping).find(route => {
            const routeParts = route.split('/');
            const currentParts = currentPath.split('/').slice(1);

            if (routeParts.length !== currentParts.length) return false;

            return routeParts.every((part, i) =>
                part.startsWith(':') || part === currentParts[i]
            );
        });

        if (matchedRoute) {
            const { title, param } = routeMapping[matchedRoute];
            breadcrumbs.push({
                title: title,
                url: currentPath,
                isParam: segment === params[param]
            });
        } else {
            breadcrumbs.push({
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                url: currentPath,
                isParam: false
            });
        }
    });

    return breadcrumbs;
};
