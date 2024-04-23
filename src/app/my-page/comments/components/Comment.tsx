import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CommentData } from '@/types/post';
import formatDate from '@/utils/date';
import Link from 'next/link';

export default function Comment(comment: CommentData) {
    return (
        <Card className="mt-4 sm:mt-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-44 mb-4 ">
            <CardHeader>
                <CardTitle className="text-base truncate">
                    <Link href={`/post/${comment.postId}`}>
                        {comment.postTitle}
                    </Link>
                </CardTitle>
                <CardDescription className="flex items-center pt-1">
                    {formatDate(comment.createdAt)}
                    {formatDate(comment.updatedAt) !=
                    formatDate(comment.createdAt) ? (
                        <p className="ml-2 text-xs">
                            (변경됨 {formatDate(comment.updatedAt)})
                        </p>
                    ) : (
                        ''
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="truncate text-sm">{comment.content}</p>
            </CardContent>
        </Card>
    );
}
