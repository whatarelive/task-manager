import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SummaryCardSkeleton = () => {
    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <Skeleton className="h-6 w-[100px]"/>    
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-[130px]"/>
                        <Skeleton className="h-6 w-6"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-[120px]"/>
                        <Skeleton className="h-6 w-6"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-[125px]"/>
                        <Skeleton className="h-6 w-6"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
