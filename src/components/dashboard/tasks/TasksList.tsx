"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useTakStore } from "@/store/task-store";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
  
export const TasksList = () => {
    const [ selectedTab, setSelectedTab ] = useState<string>("all");
    const { tasks, getTaks, filterTask, updateTask } = useTakStore();

    const filteredTasks = useMemo(
        () => selectedTab === "all" ? tasks : filterTask(selectedTab), 
        [selectedTab]
    );

    useEffect(() => {
        // getTaks();
    }, []);

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" onClick={(e) => setSelectedTab(e.currentTarget.value)}>
                    Todas
                </TabsTrigger>
                <TabsTrigger value="pending" onClick={(e) => setSelectedTab(e.currentTarget.value)}>
                    Pendientes
                </TabsTrigger>
                <TabsTrigger value="completed" onClick={(e) => setSelectedTab(e.currentTarget.value)}>
                    Completadas
                </TabsTrigger>
            </TabsList>
            
            {["all", "pending", "completed"].map((filter) => (
                <TabsContent key={filter} value={filter} className="mt-6">
                    {!filteredTasks || filteredTasks.length === 0 ? (
                        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                            <p className="text-muted-foreground">No hay tareas para mostrar</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`flex items-start justify-between rounded-lg border p-4 
                                        ${task.status ? "bg-muted/50" : ""}`
                                    }
                                >
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            checked={task.status === ""}
                                            onCheckedChange={async () => await updateTask(task.id, task.status === "" ? "" : "")}
                                            className="mt-1"
                                        />
                                        <div>
                                            <p className={`font-medium ${task.status === "" ? "line-through text-muted-foreground" : ""}`}>
                                                {task.title}
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    <span>{format(task.final_at, "PPP", { locale: es })}</span>
                                                </div>

                                                {task.tags!.map((tag) => (
                                                    <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                                                        <div className={`h-2 w-2 rounded-full ${tag.color}`} />
                                                        {tag.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    )
}
