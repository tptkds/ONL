import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function CatergorySelect({
    setCategory,
}: {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="category">카테고리</Label>
            <Select
                defaultValue="movie-talk"
                onValueChange={handleCategoryChange}
            >
                <SelectTrigger className="w-[180px]  ">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                    <SelectItem value="movie-talk">영화이야기</SelectItem>
                    <SelectItem value="daily-life">일상이야기</SelectItem>
                    <SelectItem value="movie-review">영화리뷰</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
