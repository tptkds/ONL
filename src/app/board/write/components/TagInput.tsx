import { TagOption } from '@/types/post';
import { ActionMeta, MultiValue } from 'react-select';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const CreatableSelect = dynamic(() => import('react-select/creatable'), {
    ssr: false,
    loading: () => (
        <div className="space-y-2 mt-0.5">
            <Skeleton className="h-8 w-full" />
        </div>
    ),
});

export default function TagInput({
    selectedTags,
    setSelectedTags,
}: {
    selectedTags: TagOption[];
    setSelectedTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
}) {
    const CustomDropdownIndicator = () => null;
    const CustomSeparator = () => null;

    function isMultiValueTagOption(value: any): value is MultiValue<TagOption> {
        return (
            Array.isArray(value) &&
            value.every(item => 'value' in item && 'label' in item)
        );
    }

    const handleTagsChange = (
        newValue: unknown,
        actionMeta: ActionMeta<unknown>
    ) => {
        if (isMultiValueTagOption(newValue)) {
            if (newValue.length > 3) {
                alert('최대 3개의 태그만 추가할 수 있습니다.');
            } else {
                setSelectedTags([...newValue]);
            }
        } else {
            console.error('Invalid tag data received');
        }
    };

    return (
        <CreatableSelect
            isMulti
            onChange={handleTagsChange}
            value={selectedTags}
            placeholder="태그 추가 (최대 3개)"
            className="border-neutral-200 w-full text-sm "
            components={{
                DropdownIndicator: CustomDropdownIndicator,
                IndicatorSeparator: CustomSeparator,
            }}
        />
    );
}
