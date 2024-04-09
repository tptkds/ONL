'use client';

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
    Timestamp,
} from 'firebase/firestore';
import { PAGE_SIZE } from '@/constants/post';

interface PostData {
    authorId: string;
    category: string;
    content: string;
    createdAt: Timestamp;
    tags: string[];
    title: string;
    updatedAt: Timestamp;
}

async function fetchAllPosts(
    page: number,
    lastDocument?: QueryDocumentSnapshot<PostData>
): Promise<PostData[]> {
    const postsRef = collection(db, 'posts');
    let dataQuery;
    if (page === 0) {
        dataQuery = query(postsRef, orderBy('createdAt'), limit(PAGE_SIZE));
    } else {
        if (!lastDocument)
            throw new Error(
                'Last document is required for pagination after the first page.'
            );
        dataQuery = query(
            postsRef,
            orderBy('createdAt'),
            startAfter(lastDocument),
            limit(PAGE_SIZE)
        );
    }
    const querySnapshot = await getDocs(dataQuery);
    return querySnapshot.docs.map(doc => doc.data() as PostData);
}

export default function Posts() {
    const [page, setPage] = useState<number>(0);
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useQuery<PostData[], Error>({
        queryKey: ['posts', 'all', page],
        queryFn: () => fetchAllPosts(page),
    });

    useEffect(() => {
        if (status === 'success' && data && data.length > 0) {
            queryClient.setQueryData(['posts', 'all', page], data);
        }
    }, [status, data, page, queryClient]);

    return (
        <div>
            {status === 'pending' && <div>Loading...</div>}
            {status === 'error' && error && <div>Error: {error.message}</div>}
            {status === 'success' && data && (
                <ul>
                    {data.map((post, index) => (
                        <li key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
