"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeTask } from "@/actions/tasks/update-task";
import { removeTask } from "@/actions/tasks/remove-task";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { Task } from "@/interfaces/data.interfaces";

export function useTasks(tasks?: Task[]) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filterTasks, setFilterTasks] = useState<Task[]>(tasks ?? []);

    // Efecto para filtrar las tareas usando los searchParams
    useEffect(() => {
        if (!tasks?.length) return;
        
        // Se extraen los searchParams
        const tagName = searchParams.get("tag");
        const query = searchParams.get("query");
        const tab = searchParams.get("tab");

        // Comenzamos con todas las tareas originales
        let filteredResults = [...tasks];
        
        // Aplicamos el filtro por tab (estado)
        if (tab && tab !== "all") {
            filteredResults = filteredResults.filter(task => task.status === tab);
        }
        
        // Aplicamos el filtro por etiqueta
        if (tagName) {
            filteredResults = filteredResults.filter(task => 
                task.tags_detail.some(tag => tag.name === tagName)
            );
        }
        
        // Aplicamos el filtro por búsqueda de texto
        if (query) {
            filteredResults = filteredResults.filter(task => 
                task.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        // Actualizamos el estado una sola vez con todos los filtros aplicados
        setFilterTasks(filteredResults);
        
    }, [searchParams, tasks]);

    // Función auxiliar para manejar las tabs
    const handleSelectTab = (selectTab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", selectTab);
        router.push(`?${params.toString()}`);
    }

    // Función auxiliar para actualizar el estado de las tareas
    const handleUpdate = async(id: number) => {
        const { error } = await completeTask(id);

        if (!error) {
            const updateData = filterTasks.filter((task) => {
                if (task.id !== id) return task;
                return { ...task, status: "completed" };
            });
        
            setFilterTasks(updateData);
        
            showSuccessToast({ title: "Tarea completada" });
        }
        
        else showErrorToast({ title: "Fallo la actualización de la tarea" });
    }

    // Función auxiliar para eliminar una de las tareas según el ID.
    const handleDelete = async (id: number) => {
        const { error } = await removeTask(id);
        
        if (!error) {
            const data = filterTasks.filter((task) => task.id !== id);
        
            setFilterTasks(data);
        
            showSuccessToast({ title: "Tarea eliminada" });
        }
        
        else showErrorToast({ title: "Fallo la eliminación de la tarea" });
    }

    return {
        filterTasks,
        handleSelectTab,
        handleUpdate,
        handleDelete
    }
}