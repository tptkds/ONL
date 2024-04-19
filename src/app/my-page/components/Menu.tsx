import Link from 'next/link';

export default function Menu() {
    return (
        <ul className="menu bg-base-200 sm:w-56 rounded-box flex-row sm:flex-col justify-center sm:justify-normal sm:items-start">
            <li>
                <Link href="/my-page/bookmark">북마크한 영화</Link>
            </li>
            <li>
                <Link href="/my-page/watched">시청한 영화</Link>
            </li>
            <li>
                <Link href="/my-page/posts">내가 쓴 글</Link>
            </li>
            <li>
                <Link href="/my-page/comments">내가 남긴 댓글</Link>
            </li>
            <li>
                <Link href="/my-page/recommendations">추천한 글</Link>
            </li>
            <li>
                <Link href="/my-page/edit-profile">내 정보 수정</Link>
            </li>
        </ul>
    );
}
