import { PostData } from '@/types/post';
import formatDate from '@/utils/date';
import Link from 'next/link';

export default function List({ posts }: { posts: PostData[] }) {
    return (
        <div className="w-full bg-white shadow overflow-hidden rounded-md ">
            <ul className="divide-y divide-gray-200">
                {posts.map((post, index) => (
                    <li key={index} className="px-4 py-4 hover:bg-gray-50 ">
                        <article className="flex flex-col md:flex-row justify-between md:items-center flex-wrap md:flex-nowrap md:space-x-3">
                            <div className="flex items-center">
                                <p className="flex-shrink-0  text-xs w-16 font-semibold text-center mr-4">
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
                            </div>
                            <div className=" flex flex-shrink-0 flex md:space-x-1 text-xs text-gray-500 mt-2 md:mt-0">
                                <time>{formatDate(post.createdAt)}</time>
                                <span aria-hidden="true">&middot;</span>
                                <span>조회 {post.viewCount}</span>
                                <span aria-hidden="true">&middot;</span>
                                <span>추천 {post.likeCount}</span>
                                <span
                                    aria-hidden="true"
                                    className="hidden sm:inline"
                                >
                                    &middot;
                                </span>
                                <span className="hidden sm:inline">
                                    {post.authorName}
                                </span>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}
