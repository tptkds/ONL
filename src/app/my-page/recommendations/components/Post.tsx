import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LikePostData } from '@/types/post';
import formatDate from '@/utils/date';
import { createMarkup } from '@/utils/post';

export default function Post(likedPost: LikePostData) {
    return (
        <Card className="mt-4 sm:mt-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-56">
            <CardHeader>
                <CardTitle>{likedPost.postTitle}</CardTitle>
                <CardDescription>{formatDate(likedPost.added)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p
                    dangerouslySetInnerHTML={createMarkup(
                        likedPost.postContent
                    )}
                ></p>
            </CardContent>
        </Card>
    );
}
