import { PostData } from '@/types/post';
import Link from 'next/link';

export default function Post(post: PostData) {
    return (
        <div className="">
            <Link href={`/post/${post.postId}`}>{post.title}</Link>
        </div>
    );
}
