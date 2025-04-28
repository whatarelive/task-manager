"use client";

import Image from "next/image";
import { memo, use } from "react";
import { useTasks } from "@/hooks/useTasks";
import { showErrorToast } from "@/components/ui/sonner";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkSpaceTaskItem } from "@/components/dashboard/workspaces/details/WorkSpaceTaskItem";
import type { Task } from "@/interfaces/data.interfaces";

interface Props {
    workSpaceId: string;
    members: string[];
    isAdmin: boolean;
    getTasks: Promise<{
        error?: boolean;
        data?: { assigned_to: string } & Task[];
    }>
}

export const WorkSpaceTasksList = memo(({ workSpaceId, members, isAdmin, getTasks }: Props) => {
    const { data, error } = use(getTasks);
    const { filterTasks, handleSelectTab, handleUpdate, handleDelete } = useTasks(data);

    if (!data && error) showErrorToast({ title: "Error al cargar las tareas "});

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
                                    <WorkSpaceTaskItem
                                        key={task.id} 
                                        task={task} 
                                        isAdmin={isAdmin}
                                        members={members}
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