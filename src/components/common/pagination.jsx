import PropTypes from 'prop-types';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export const PaginationComponent = ({ page, onPage }) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={page.page <= 1}
                        onClick={() => onPage(page.page - 1)}
                        className={page.page <= 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>
                {page.page > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            aria-disabled={page.page <= 1}
                            onClick={() => onPage(page.page - 1)}
                            className={page.page <= 1 ? "pointer-events-none opacity-50" : undefined}
                        >
                            {page.page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink isActive>{page.page}</PaginationLink>
                </PaginationItem>
                {(page.totalPages - page.page) > 0 && (
                    <PaginationItem>
                        <PaginationLink
                            aria-disabled={(page.page === page.totalPages) || page.totalPages === 0}
                            onClick={() => onPage(page.page + 1)}
                            className={(page.page === page.totalPages) || page.totalPages === 0 ? "pointer-events-none opacity-50" : undefined}
                        >
                            {page.page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={(page.page === page.totalPages) || page.totalPages === 0}
                        onClick={() => onPage(page.page + 1)}
                        className={(page.page === page.totalPages) || page.totalPages === 0 ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

PaginationComponent.propTypes = {
    page: PropTypes.object,
    onPage: PropTypes.func,
}
