"use client"

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { removeTag } from "@/actions/tags/remove-tag";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { Tag } from "@/interfaces/data.interfaces";

// Interfaz que define la estructura del estado y sus acciones
interface State {
    tags: Tag[];                           // Array de etiquetas
    setTags: (tags: Tag[]) => void;        // Actualiza todas las etiquetas
    addTag: (tag: Tag) => void;            // Añade una etiqueta al estado
    removeTag: (tagId: number) => Promise<void>;    // Elimina una etiqueta por su id
    clearTags: () => void;                 // Limpia la lista de etiquetas
}

// Creación del estado global usando Zustand para manejar etiquetas
export const useTagStore = create<State>()(
    persist(
        (set, get) => ({
            tags: [], // Estado inicial - array vacío de etiquetas
            
            // Función para actualizar completamente el listado de etiquetas
            setTags(tags) {
                set({ tags });
            },

            // Función para añadir una nueva etiqueta al inicio del array
            addTag(tag) {
                // Agrega la nueva etiqueta al principio del array existente
                set(({ tags }) => ({ 
                    tags: tags ? [tag, ...tags] : [tag],
                }));
            },

            // Función para eliminar una etiqueta específica por su ID
            async removeTag(tagId) {
                const tags = get().tags;
                const { error } = await removeTag(tagId);
                
                // Se filtra el array para mantener solo las etiquetas que NO coinciden con el ID
                if (!error) {
                    const filtered = tags?.filter((tags) => tags.id !== tagId);
                    set({ tags: filtered });             
                    showSuccessToast({ title: "Etiqueta eliminada" });   
                }

                else showErrorToast({ title: "Fallo la eliminación de la tarea" });
            },

            // Función para vaciar completamente el array de etiquetas
            // Útil durante cierre de sesión o reinicio de la aplicación
            clearTags() {
                set({ tags: [] });
            },
        }),

        // Configuración para persistencia en localStorage
        { name: "tag-store" }
    )
)