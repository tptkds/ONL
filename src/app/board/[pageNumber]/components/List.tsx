import { PostData } from '@/types/post';
import formatDate from '@/utils/date';
import Link from 'next/link';

// import {
//     ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
// } from '@tanstack/react-table';

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from '@/components/ui/table';

// export const columns: ColumnDef<PostData>[] = [
//     {
//         accessorKey: 'title',
//         header: '제목',
//     },
//     {
//         accessorKey: 'authorName',
//         header: '글쓴이',
//     },
//     {
//         accessorKey: 'createdAt',
//         header: '날짜',
//     },
//     {
//         accessorKey: 'viewCount',
//         header: '조회',
//     },
//     {
//         accessorKey: 'likeCount',
//         header: '추천',
//     },
// ];

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[];
//     data: TData[];
// }

export default function List({ posts }: { posts: PostData[] }) {
    // return (
    //     <div>
    //         <DataTable />
    //     </div>
    // );

    return (
        <div className="w-3/4 bg-white shadow overflow-hidden rounded-md ">
            <ul className="divide-y divide-gray-200">
                {posts.map((post, index) => (
                    <li key={index} className="px-4 py-4 hover:bg-gray-50">
                        <article className="flex justify-between items-center space-x-3">
                            <Link
                                href={`/post/${post.postId}`}
                                className="w-full"
                            >
                                <h3 className="  text-sm font-medium text-gray-900 truncate">
                                    {post.title}
                                </h3>
                            </Link>
                            <div className=" flex flex-shrink-0 flex space-x-1 text-sm text-gray-500">
                                <time>{formatDate(post.createdAt)}</time>
                                <span aria-hidden="true">&middot;</span>
                                <span>조회 {post.viewCount}</span>
                                <span aria-hidden="true">&middot;</span>
                                <span>추천 {post.likeCount}</span>
                                <span aria-hidden="true">&middot;</span>
                                <span>{post.authorName}</span>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}
