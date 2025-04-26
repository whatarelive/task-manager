"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import todoApi from "@/lib/api/todo-api";
import { showErrorToast } from "@/components/ui/sonner";
import type { Tag } from "@/interfaces/data.interfaces";

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
    isLoading: boolean;
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
            isLoading: false,
            complete: 0,
            pendings: 0,

            async getTaks() {
                try {
                    const { data } = await todoApi.get<ResponseTask>("/todo/user/tasks/");

                    const complete = data.task.filter((task) => task.status === "complete").length;
                    const pendings = data.task.length - complete;

                    set({ tasks: data.task, complete, pendings });

                } catch (error) {
                    console.log(error);
                    return showErrorToast({ title:"Fallo la carga de las tareas" });
                }    
            },

            async createTask(task) {
                set({ isLoading: true });

                try {
                    const { data } = await todoApi.post<Task>("/todo/user/tasks/", { ...task });
                    
                    if (!data) throw new Error("Error API");

                    set(({ tasks }) => ({ 
                        tasks: tasks ? [...tasks, data] : [data] 
                    }));

                } catch (error) {
                    console.log(error);
                    showErrorToast({ title: "Fallo la creación de la tarea" });
                }

                set({ isLoading: false });
            },

            async updateTask(id, status) {
                const { tasks, complete, pendings } = get();
                
                if (!tasks) return;

                try {
                    const { data } = await todoApi.put<Task>(`/${id}`, { status });

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