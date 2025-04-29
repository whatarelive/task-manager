import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const WorkSpaceListSkeleton = () => (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
            Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-3">
                        <span data-slot="skeleton" className="skeleton h-5 w-[150px]"/>
                        <span data-slot="skeleton" className="skeleton h-5 w-[280px]"/>
                    </CardHeader>

                    <CardContent className="flex justify-between">
                        <div className="flex -space-x-2">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <span 
                                    key={index} 
                                    data-slot="skeleton" 
                                    className="bg-neutral-200 border animate-pulse h-8 w-8 rounded-full"
                                />
                            ))}
                        </div>

                        <span data-slot="skeleton" className="skeleton h-9 w-[110px]"/>
                    </CardContent>
                </Card>
            ))
        }
    </ul>
)
