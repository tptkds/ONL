import { Skeleton } from '@/components/ui/skeleton';

export default function BoardSkeleton() {
    return (
        <div className="flex  flex-col items-center space-x-4 w-full">
            <div className="flex flex-col space-y-2  w-3/4">
                {Array.from({ length: 10 }, (_, i) => (
                    <Skeleton className="h-12 w-full " key={i} />
                ))}
            </div>
            <div className="mt-6 flex items-center justify-center">
                <Skeleton className="h-8 w-16" />
                {Array.from({ length: 5 }, (_, i) => (
                    <Skeleton className="h-8 w-8 mx-2" key={i} />
                ))}
                <Skeleton className="h-8 w-16" />
            </div>
        </div>
    );
}
