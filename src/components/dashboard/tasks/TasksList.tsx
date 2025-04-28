"use client";

import Image from "next/image";
import { memo, use, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/task-store";
import { showErrorToast } from "@/components/ui/sonner";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskItem } from "@/components/dashboard/tasks/TaskItem";
import type { Task } from "@/interfaces/data.interfaces";

interface Props {
    getTasks: Promise<{
        error?: boolean;
        data?: Task[];
    }>
}

export const TasksList = memo(({ getTasks }: Props) => {
    const { data, error } = use(getTasks);
    const { setLengthTasks } = useTaskStore();
    const { filterTasks, handleSelectTab, handleUpdate, handleDelete } = useTasks(data);

    if (!data && error) showErrorToast({ title: "Error al cargar las tareas "});

    useEffect(() => {
        setLengthTasks(data ?? []);
    }, [])

    return (
        <section className="w-full">
            <TabsList>
                <TabsTrigger value="all" onClick={() => handleSelectTab("all")}>Todas</TabsTrigger>
                <TabsTrigger value="pending" onClick={() => handleSelectTab("pending")}>Pendientes</TabsTrigger>
                <TabsTrigger value="completed" onClick={() => handleSelectTab("completed")}>Completadas</TabsTrigger>
            </TabsList>
            
            <section>
                {
                    filterTasks.length === 0 ? (
                        <div className="h-fit rounded-lg border border-dashed p-4 text-center mt-6">
                            <Image 
                                src="/empty_data.svg" 
                                alt="Empty Tasks" 
                                width={200} height={250} 
                                className="mx-auto mb-4 opacity-75"
                            />
                            <p className="text-gray-300">No hay tareas para mostrar</p>
                        </div>
                    ) : (
                        <ul className="space-y-4 mt-1 py-6 pr-4 overflow-y-auto elegant-scrollbar max-h-[600px]">
                            {
                                filterTasks.map((task) => (
                                    <TaskItem 
                                        key={task.id} 
                                        task={task} 
                                        updateTask={async() => await handleUpdate(task.id)} 
                                        deleteTask={async() => await handleDelete(task.id)}
                                    />
                                ))
                            }
                        </ul>
                    )
                }
            </section>
        </section>
    )
})