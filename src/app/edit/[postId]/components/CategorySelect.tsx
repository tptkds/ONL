import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function CatergorySelect({
    category,
    setCategory,
}: {
    category: string;

    setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="category">카테고리</Label>
            <Select onValueChange={handleCategoryChange} value={category}>
                <SelectTrigger className="w-[180px]  ">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                    <SelectItem value="영화이야기">영화이야기</SelectItem>
                    <SelectItem value="일상이야기">일상이야기</SelectItem>
                    <SelectItem value="영화리뷰">영화리뷰</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
