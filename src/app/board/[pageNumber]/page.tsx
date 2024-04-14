'use client';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { PAGE_SIZE } from '@/constants/post';
import fetchTotalPostsCount from '@/service/post/getTotalPostsCount';
import Pagination from './components/Pagination';
import List from './components/List';
import { PostData } from '@/types/post';
import getPosts from '@/service/post/getPosts';
import useStore from '@/app/store';

interface PostQueryResult {
    data: PostData[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
}

export default function Board({ params }: { params: { pageNumber: number } }) {
    const [page, setPage] = useState(params.pageNumber);

    const { lastDoc, setLastDoc } = useStore();
    const { data, isFetching } = useQuery<PostQueryResult>({
        queryKey: ['posts', 'all', page],
        queryFn: async () => await getPosts(page - 1, lastDoc),
        placeholderData: keepPreviousData,
        staleTime: 500,
    });

    useEffect(() => {
        if (data?.lastDoc) setLastDoc(data?.lastDoc);
        console.log(lastDoc);
    }, [data]);

    const { data: totalPosts, isFetching: isFetchingTotalPosts } = useQuery({
        queryKey: [['totalPosts']],
        queryFn: async () => fetchTotalPostsCount(),
        staleTime: 500,
    });

    const totalPages = totalPosts ? Math.ceil(totalPosts / PAGE_SIZE) : 0;
    if (isFetching || isFetchingTotalPosts) return <div>loading..</div>;

    return (
        <div className="min-h-screen w-full py-8">
            <div className="container mx-auto px-4">
                <List posts={data?.data || []} />
                <Pagination
                    pageIndex={params.pageNumber}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}
