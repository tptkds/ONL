import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CommentData } from '@/types/post';
import formatDate from '@/utils/date';

export default function Comment(comment: CommentData) {
    return (
        <Card className="mt-4 sm:mt-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-56">
            <CardHeader>
                <CardTitle>{comment.postTitle}</CardTitle>
                <CardDescription>
                    {formatDate(comment.updatedAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{comment.content}</p>
            </CardContent>
        </Card>
    );
}
