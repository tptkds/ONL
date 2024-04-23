import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PostData } from '@/types/post';
import formatDate from '@/utils/date';
import Link from 'next/link';

export default function Post(post: PostData) {
    return (
        <Card className="mt-4 sm:mt-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-44 mb-4">
            <CardHeader>
                <CardTitle className="text-base truncate">
                    <Link href={`/post/${post.postId}`}>
                        [{post.category}] {post.title}
                    </Link>
                </CardTitle>
                <CardDescription className="flex items-center pt-1">
                    {formatDate(post.createdAt)}
                    {formatDate(post.updatedAt) !=
                    formatDate(post.createdAt) ? (
                        <p className="ml-2 text-xs">
                            (변경됨 {formatDate(post.updatedAt)})
                        </p>
                    ) : (
                        ''
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {post.tags && (
                    <div className="">
                        {post.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-block bg-neutral-200 text-neutral-500 rounded-full px-3 py-1 text-xs text-gray-700 mr-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
