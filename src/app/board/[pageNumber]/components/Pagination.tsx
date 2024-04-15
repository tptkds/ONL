import {
    Pagination as PaginationWrapper,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function Pagination({
    pageIndex,
    totalPages,
}: {
    pageIndex: number;
    totalPages: number;
}) {
    const renderPageNumbers = () => {
        let pages = [];
        for (let i = pageIndex; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={`/board/${i}`}
                        isActive={i == pageIndex}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pages;
    };
    return (
        <PaginationWrapper className=" mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={`/board/${+pageIndex - 1}`}
                        aria-disabled={pageIndex <= 1}
                        className={
                            pageIndex <= 1
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href={`/board/${+pageIndex + 1}`}
                        aria-disabled={pageIndex == totalPages}
                        className={
                            pageIndex == totalPages
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationWrapper>
    );
}
