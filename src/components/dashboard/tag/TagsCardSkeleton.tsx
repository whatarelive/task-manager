import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TagsCardSkeleton = () => {
    return (
        <Card className="border-0 p-6">
            <div className="space-y-1.5">
                <Skeleton className="h-5 w-[125px] rounded-xl" />
                <Skeleton className="h-5 w-[240px] rounded-xl" />
            </div>
            
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between gap-2">
                        <Skeleton className="h-9 w-[200px]" />
                        <Skeleton className="h-9 w-9" />
                    </div>
                ))}
            </div>

            <Skeleton className="h-10 w-full"/>
        </Card>
    )
}