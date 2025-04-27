"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import todoApi from "@/lib/api/todo-api";
import { getTask } from "@/actions/tasks/get-tasks";
import { showErrorToast } from "@/components/ui/sonner";
import type { Task } from "@/interfaces/data.interfaces";

type State = {
    tasks: Task[] | null;
    isLoading: boolean;
    complete: number;
    pendings: number;
    getTaks: () => Promise<void>;
    addTask: (task: Task) => Promise<void>;
    updateTask: (id: number, status: string) => Promise<void>;
    filterTask: (status: string, query?: string) => Task[] | null;
    clearTask: () => void;
}

export const useTakStore = create<State>()(
    persist(
        (set, get) => ({
            tasks: null,
            isLoading: true,
            complete: 0,
            pendings: 0,

            async getTaks() {
                set({ isLoading: true });
            
                const { data, error } = await getTask();

                if (!error && data) {
                    const complete = data.filter((task) => task.status === "complete").length;
                    const pendings = data.length - complete;
                    
                    set({ tasks: data, complete, pendings });
                } 
            
                else return showErrorToast({ title:"Fallo la carga de las tareas" });
                
                set({ isLoading: false });
            },

            async addTask(task) {
                set(({ tasks }) => ({ 
                    tasks: tasks ? [task, ...tasks] : [task] 
                }));

                showErrorToast({ title: "Fallo la creación de la tarea" });
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

    { name: "task-store" }
))