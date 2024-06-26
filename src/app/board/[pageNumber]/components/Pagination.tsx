import {
    Pagination as PaginationWrapper,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationFirst,
    PaginationLast,
} from '@/components/ui/pagination';

export default function Pagination({
    curPage,
    totalPages,
}: {
    curPage: number;
    totalPages: number;
}) {
    const renderPageNumbers = () => {
        let pages = [];
        for (let i = curPage; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={`/board/${i}`}
                        isActive={i == curPage}
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
                {curPage > 1 && (
                    <PaginationItem>
                        <PaginationFirst href={`/board/1`} />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationPrevious
                        href={`/board/${+curPage - 1}`}
                        aria-disabled={curPage <= 1}
                        className={
                            curPage <= 1
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>
                {renderPageNumbers()}

                <PaginationItem>
                    <PaginationNext
                        href={`/board/${+curPage + 1}`}
                        aria-disabled={curPage == totalPages}
                        className={
                            curPage == totalPages
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>
                {curPage < totalPages && (
                    <PaginationItem>
                        <PaginationLast href={`/board/${totalPages}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationWrapper>
    );
}
