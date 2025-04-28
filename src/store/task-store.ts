"use client"; 

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "@/interfaces/data.interfaces";

// Definición del tipo de estado que manejará el store
type State = {
    pendings: number;        // Contador de tareas pendientes
    completeds: number;      // Contador de tareas completadas
    isLoading: boolean;      // Indicador del estado de carga
    setLengthTasks: (task: Task[]) => void;  // Función para actualizar contadores basados en el array de tareas
    clearStore: () => void   // Función para reiniciar los contadores
}

// Creación del store global usando Zustand
export const useTaskStore = create<State>()(
    persist(
        (set) => ({
            // Estado inicial
            pendings: 0,
            completeds: 0,
            isLoading: true,

            // Función para actualizar los contadores basados en un array de tareas
            setLengthTasks(task) {
                set({ isLoading: true }); // Activamos estado de carga

                // Calculamos tareas completadas filtrando por status
                const completeds = task.filter((task) => task.status === "completed").length;
                // Las pendientes son el total menos las completadas
                const pendings = task.length - completeds;

                // Actualizamos el estado con los nuevos valores y desactivamos el estado de carga
                set({ pendings, completeds, isLoading: false });
            },

            // Función para reiniciar los contadores a cero
            clearStore() {
                set({ pendings: 0, completeds: 0 });
            }
    }),

    { name: "task-store" } // Configuración para persistir el estado en localStorage con esta clave
))