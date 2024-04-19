import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Comment(comment: Comment) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{comment.postTitle}</CardTitle>
                <CardDescription>{comment.updateAt}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{comment.content}</p>
            </CardContent>
        </Card>
    );
}
