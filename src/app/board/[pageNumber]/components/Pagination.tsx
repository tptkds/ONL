import Link from 'next/link';

export default function Pagination({
    pageIndex,
    totalPages,
}: {
    pageIndex: number;
    totalPages: number;
}) {
    const renderPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Link
                    key={i}
                    href={`/board/${i}`}
                    className={`px-3 py-1 ${pageIndex == i ? 'text-white bg-blue-500' : 'text-blue-500 bg-white'} rounded hover:bg-blue-200`}
                >
                    {i}
                </Link>
            );
        }
        return pages;
    };
    return (
        <div className="flex justify-between items-center mt-6">
            {pageIndex > 1 && (
                <Link
                    href={`/board/${pageIndex - 1}`}
                    className="px-4 py-2 border border-gray-300 text-base rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    이전
                </Link>
            )}
            <div className="flex space-x-2">{renderPageNumbers()}</div>
            {pageIndex < totalPages && (
                <Link
                    href={`/board/${+pageIndex + 1}`}
                    className="px-4 py-2 border border-gray-300 text-base rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    다음
                </Link>
            )}
        </div>
    );
}
