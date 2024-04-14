import { PostData } from '@/types/post';
import formatDate from '@/utils/date';

export default function List({ posts }: { posts: PostData[] }) {
    return (
        <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
                {posts.map((post, index) => (
                    <li key={index} className="px-4 py-4 hover:bg-gray-50">
                        <article className="flex justify-between items-center space-x-3">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                {post.title}
                            </h3>
                            <div className="flex space-x-1 text-sm text-gray-500">
                                <time
                                    dateTime={post.createdAt
                                        ?.toDate()
                                        .toISOString()}
                                >
                                    {formatDate(post.createdAt?.toDate())}
                                </time>
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
