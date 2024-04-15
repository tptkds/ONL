'use client';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { db } from '../firebase';
import {
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
    Timestamp,
} from 'firebase/firestore';
import { PAGE_SIZE } from '@/constants/post';
import { PostData } from '@/types/post';

async function fetchAllPosts(
    page: number,
    lastDocument?: QueryDocumentSnapshot<DocumentData>
): Promise<{
    data: PostData[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
    hasMore: boolean;
}> {
    const postsRef = collection(db, 'posts');
    let dataQuery;

    if (page === 0 || !lastDocument) {
        dataQuery = query(postsRef, orderBy('createdAt'), limit(PAGE_SIZE + 1));
    } else {
        dataQuery = query(
            postsRef,
            orderBy('createdAt'),
            startAfter(lastDocument),
            limit(PAGE_SIZE + 1)
        );
    }
    const querySnapshot = await getDocs(dataQuery);

    const hasMore = querySnapshot.docs.length > PAGE_SIZE;

    const data = querySnapshot.docs
        .slice(0, PAGE_SIZE)
        .map(doc => doc.data() as PostData);

    const lastVisible = hasMore ? querySnapshot.docs[PAGE_SIZE - 1] : undefined;

    return {
        data,
        lastDoc: lastVisible,
        hasMore,
    };
}

export default function Posts() {
    const [page, setPage] = useState(0);
    const [lastDoc, setLastDoc] = useState<
        QueryDocumentSnapshot<DocumentData> | undefined
    >(undefined);

    const { isPending, isError, error, data, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ['posts', 'all', page],
            queryFn: () => fetchAllPosts(page, lastDoc),
            placeholderData: keepPreviousData,
            staleTime: 5000,
        });

    const handleNextPage = () => {
        setPage(old => old + 1);
    };

    const handlePrevPage = () => {
        setPage(old => Math.max(old - 1, 0));
    };
    return (
        <div>
            {isPending ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    <ul>
                        {data?.data.map((post, index) => (
                            <li key={index}>
                                <h3>{post.title}</h3>
                                <p>{post.content.substring(0, 100)}...</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handlePrevPage} disabled={page === 0}>
                        Previous Page
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={!(data?.hasMore || isPlaceholderData)}
                    >
                        Next Page
                    </button>
                    {isFetching ? <span> Loading...</span> : null}
                </>
            )}
        </div>
    );
}
