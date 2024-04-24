import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TitleInput({
    title,
    setTitle,
}: {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor="title">제목</Label>
            <Input
                required
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
        </div>
    );
}
