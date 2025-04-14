import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { initialTasks } from "@/lib/data/taks";

export const SummaryCard = () => {
    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span>Total de tareas</span>
                    <Badge variant="outline">{initialTasks.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <span>Completadas</span>
                    <Badge variant="outline">{initialTasks.filter((task) => task.completed).length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <span>Pendientes</span>
                    <Badge variant="outline">{initialTasks.filter((task) => !task.completed).length}</Badge>
                </div>
                </div>
            </CardContent>
        </Card>
    )
}
