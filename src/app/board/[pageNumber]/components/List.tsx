import { PostData } from '@/types/post';
import formatDate from '@/utils/date';
import Link from 'next/link';

export default function List({ posts }: { posts: PostData[] }) {
    return (
        <div className="w-full bg-white shadow overflow-hidden rounded-md ">
            <ul className="divide-y divide-gray-200">
                {posts.map((post, index) => (
                    <li key={index} className="px-4 py-4 hover:bg-gray-50">
                        <article className="flex justify-between items-center space-x-3">
                            <p className="text-xs w-52 font-semibold text-center">
                                {post.category}
                            </p>
                            <Link
                                href={`/post/${post.postId}`}
                                className="w-full "
                            >
                                <h3 className="  text-sm text-gray-900 truncate">
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
