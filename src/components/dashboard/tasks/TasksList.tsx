"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { initialTasks } from "@/lib/data/taks";

// Tipos para nuestras tareas
type TaskTag = {
    id: string
    name: string
    color: string
}
  
type Task = {
    id: string
    title: string
    completed: boolean
    dueDate: Date | null
    tags: TaskTag[]
}

export const TasksList = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // Filtrar tareas según la pestaña activa, búsqueda y etiqueta seleccionada
    const filterTasks = (taskList: Task[], filter: string) => {
        let filtered = taskList

        // Filtrar por estado (completado/pendiente)
        if (filter === "pending") {
            filtered = filtered.filter((task) => !task.completed)
        } else if (filter === "completed") {
            filtered = filtered.filter((task) => task.completed)
        }

        // Filtrar por búsqueda
        // if (searchQuery) {
        //     filtered = filtered.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        // }

        // Filtrar por etiqueta
        // if (selectedTag) {
        //     filtered = filtered.filter((task) => task.tags.some((tag) => tag.id === selectedTag))
        // }

        return filtered
    }

    // Cambiar estado de tarea (completada/pendiente)
    const toggleTaskStatus = (taskId: string) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
    }

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
            </TabsList>
            
            {["all", "pending", "completed"].map((filter) => (
                <TabsContent key={filter} value={filter} className="mt-6">
                    {filterTasks(tasks, filter).length === 0 ? (
                        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                        <p className="text-muted-foreground">No hay tareas para mostrar</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                        {filterTasks(tasks, filter).map((task) => (
                            <div
                            key={task.id}
                            className={`flex items-start justify-between rounded-lg border p-4 ${
                                task.completed ? "bg-muted/50" : ""
                            }`}
                            >
                            <div className="flex items-start gap-3">
                                <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskStatus(task.id)}
                                className="mt-1"
                                />
                                <div>
                                <p
                                    className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                                >
                                    {task.title}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {task.dueDate && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <CalendarIcon className="h-3 w-3" />
                                        {format(task.dueDate, "PPP", { locale: es })}
                                    </div>
                                    )}
                                    {task.tags.map((tag) => (
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
