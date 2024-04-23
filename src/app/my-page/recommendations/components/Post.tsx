import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LikePostData } from '@/types/post';
import formatDate from '@/utils/date';
import Link from 'next/link';

export default function Post(likedPost: LikePostData) {
    return (
        <Card className="mt-4 sm:mt-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-28 mb-4">
            <CardHeader>
                <CardTitle className="text-base truncate">
                    <Link href={`/post/${likedPost.postId}`}>
                        {likedPost.postTitle}
                    </Link>
                </CardTitle>
                <CardDescription className="flex items-center pt-1">
                    {formatDate(likedPost.added)}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
