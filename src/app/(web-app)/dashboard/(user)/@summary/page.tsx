import { getSummary } from "@/actions/tasks/get-summary";
import { auth } from "@/auth.config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SummaryPage() {
    const session = await auth();
    const { total, pending, completed } = await getSummary(session?.user.id!);

    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <CardTitle>Resumen</CardTitle>
            </CardHeader>
            
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Total de tareas</span>
                        <Badge variant="outline">{ total }</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Completadas</span>
                        <Badge variant="outline">{ completed }</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Pendientes</span>
                        <Badge variant="outline">{ pending }</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
