"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@/auth.config";
import { todoApi } from "@/lib/api/todo-api";
import { showErrorToast } from "@/components/ui/sonner";

interface Tag {
    id: number;
    name: string;
    color: string;
}

interface Task {
    id: number;
    title:	string;
    status: string;
    created_at:	string;
    final_at: string;
    tags: Tag[] | null;
}

type ResponseTask = {
    next: number;
    previous: number;
    task: Task[];
}

type State = {
    tasks: Task[] | null;
    complete: number;
    pendings: number;
    getTaks: () => Promise<void>;
    createTask: (task: Task) => Promise<void>;
    updateTask: (id: number, status: string) => Promise<void>;
    filterTask: (status: string, query?: string) => Task[] | null;
    clearTask: () => void;
}

export const useTakStore = create<State>()(
    persist(
        (set, get) => ({
            tasks: null,
            complete: 0,
            pendings: 0,

            async getTaks() {
                const session = await auth();

                try {
                    const { data } = await todoApi.get<ResponseTask>("/", {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`
                        }
                    });

                    const complete = data.task.filter((task) => task.status === "complete").length;
                    const pendings = data.task.length - complete;

                    set({ tasks: data.task, complete, pendings });

                } catch (error) {
                    console.log(error);
                    return showErrorToast({ title:"Fallo la carga de las tareas" });
                }    
            },

            async createTask(task) {
                set((prev) => (
                    { tasks: prev.tasks ? [...prev.tasks, task] : [task] }
                ));
            },

            async updateTask(id, status) {
                const { tasks, complete, pendings } = get();
                
                if (!tasks) return;

                const session = await auth();

                try {
                    const { data } = await todoApi.put<Task, { status: string }>(`/${id}`, 
                        { status }, 
                        {
                            headers: {
                                Authorization: `Bearer ${session?.accessToken}`
                            }
                        }
                    );

                    const updateData = tasks.map((task) => {
                        if (task.id === id) return data;
                        return task;
                    })

                    const updatePending = status === "pending" ? pendings+1 : pendings-1; 
                    const updateComplete = status === "complete" ? complete+1 : complete-1;

                    set({ tasks: updateData, pendings: updatePending, complete: updateComplete });
                    
                } catch (error) {
                    console.log(error);
                    return showErrorToast({ title:"Fallo al actualizar la tarea" });
                }
            },


            filterTask(status, query) {
                const tasks = get().tasks;
                
                if (!tasks || tasks.length === 0) return null;

                if (query) {
                    return tasks.filter((task) => task.status === status && task.title.includes(query));
                }

                return tasks.filter((task) => task.status === status);
            },

            clearTask() {
                set({ tasks: null, pendings: 0, complete: 0 });
            }
        }),
    
        { name: "task-store" },
    )
)