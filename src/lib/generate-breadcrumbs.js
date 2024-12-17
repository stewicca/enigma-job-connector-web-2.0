// TODO: Handle Params
export const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    pathSegments.forEach((segment, index) => {
        const url = '/' + pathSegments.slice(0, index + 1).join('/');
        breadcrumbs.push({ title: segment.charAt(0).toUpperCase() + segment.slice(1), url });
    });

    return breadcrumbs;
};
