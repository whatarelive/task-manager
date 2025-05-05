import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingSummaryPage() {
    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <span data-slot="skeleton" className="skeleton h-6 w-[100px]"/>    
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span data-slot="skeleton" className="skeleton h-5 w-[130px]"/>
                        <span data-slot="skeleton" className="skeleton h-6 w-6"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <span data-slot="skeleton" className="skeleton h-5 w-[120px]"/>
                        <span data-slot="skeleton" className="skeleton h-6 w-6"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <span data-slot="skeleton" className="skeleton h-5 w-[125px]"/>
                        <span data-slot="skeleton" className="skeleton h-6 w-6"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
