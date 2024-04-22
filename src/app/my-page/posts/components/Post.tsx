import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PostData } from '@/types/post';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';

export default function Post(post: PostData) {
    return (
        <Card className="mt-4 sm:mt-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-56">
            <CardHeader>
                <CardTitle>{post.title} </CardTitle>
                <CardDescription>{formatDate(post.updatedAt)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p dangerouslySetInnerHTML={createMarkup(post.content)}></p>
            </CardContent>
        </Card>
    );
}
