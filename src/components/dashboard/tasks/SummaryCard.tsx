"use client"

import { useTakStore } from "@/store/task-store";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SummaryCardSkeleton } from "@/components/dashboard/tasks/SummaryCardSkeleton";

export const SummaryCard = () => {
    const { tasks, pendings, complete, isLoading } = useTakStore();

    if (isLoading) return <SummaryCardSkeleton/>;

    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Total de tareas</span>
                        <Badge variant="outline">{tasks?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Completadas</span>
                        <Badge variant="outline">{complete}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Pendientes</span>
                        <Badge variant="outline">{pendings}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
