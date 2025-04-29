import { Card } from "@/components/ui/card";

export const TagsCardSkeleton = () => (
    <Card className="border-0 p-6">
        <div className="space-y-1.5">
            <span data-slot="skeleton" className="skeleton h-5 w-[125px] rounded-xl" />
            <span data-slot="skeleton" className="skeleton h-5 w-[240px] rounded-xl" />
        </div>
        
        <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-2">
                    <span data-slot="skeleton" className="skeleton h-9 w-[200px]" />
                    <span data-slot="skeleton" className="skeleton h-9 w-9" />
                </div>
            ))}
        </div>

        <span data-slot="skeleton" className="skeleton h-10 w-full"/>
    </Card>
)