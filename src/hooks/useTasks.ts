"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeTask } from "@/actions/tasks/update-task";
import { removeTask } from "@/actions/tasks/remove-task";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { Task } from "@/interfaces/data.interfaces";

/**
 * Hook personalizado que proporciona funcionalidades para gestionar tareas
 * incluyendo filtrado, actualización y eliminación de tareas
 * @param tasks - Array opcional de tareas iniciales
 */
export function useTasks(tasks?: Task[]) {
    // Router para navegación programática
    const router = useRouter();
    // Parámetros de búsqueda de la URL actual
    const searchParams = useSearchParams();
    // Estado local para almacenar las tareas filtradas
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

    /**
     * Actualiza la URL con la pestaña seleccionada para filtrar tareas
     * @param selectTab - Nombre de la pestaña seleccionada
     */
    const handleSelectTab = (selectTab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", selectTab);
        router.push(`?${params.toString()}`);
    }

    /**
     * Marca una tarea como completada mediante una llamada al servidor
     * y actualiza el estado local si es exitoso
     * @param id - ID de la tarea a completar
     */
    const handleUpdate = async(id: number) => {
        const { error } = await completeTask(id);

        if (!error) {
            // Actualizamos el estado local sin necesidad de recargar
            const updateData = filterTasks.filter((task) => {
                if (task.id !== id) return task;
                return { ...task, status: "completed" };
            });
        
            setFilterTasks(updateData);
        
            showSuccessToast({ title: "Tarea completada" });
        }
        
        else showErrorToast({ title: "Fallo la actualización de la tarea" });
    }

    /**
     * Elimina una tarea mediante una llamada al servidor
     * y actualiza el estado local si es exitoso
     * @param id - ID de la tarea a eliminar
     */
    const handleDelete = async (id: number) => {
        const { error } = await removeTask(id);
        
        if (!error) {
            // Filtramos la tarea eliminada del estado local
            const data = filterTasks.filter((task) => task.id !== id);
        
            setFilterTasks(data);
        
            showSuccessToast({ title: "Tarea eliminada" });
        }
        
        else showErrorToast({ title: "Fallo la eliminación de la tarea" });
    }

    return {
        filterTasks,       // Lista de tareas filtradas según los criterios
        handleSelectTab,   // Función para cambiar la pestaña activa
        handleUpdate,      // Función para marcar tareas como completadas
        handleDelete       // Función para eliminar tareas
    }
}