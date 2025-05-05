"use client"

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { removeTag } from "@/actions/tags/remove-tag";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { UserTag } from "@/interfaces/data.interfaces";

// Interfaz que define la estructura de la store y sus acciones
interface State {
    tags: UserTag[];
    setTags: (tags: UserTag[]) => void;
    addTag: (tag: UserTag) => void;
    removeTag: (tagId: string) => Promise<void>;
    clearTags: () => void;
}

// Creación del estado global usando Zustand para manejar etiquetas
export const useTagStore = create<State>()(
    persist(
        (set, get) => ({
            // Estado inicial
            tags: [], 

            // Función para actualizar completamente el listado de etiquetas
            setTags(tags) {
                set({ tags });
            },

            // Función para añadir una nueva etiqueta al inicio del array
            addTag(tag) {
                set(({ tags }) => ({ 
                    tags: tags ? [tag, ...tags] : [tag],
                }));
            },

            // Función para eliminar una etiqueta específica por su ID
            async removeTag(tagId) {
                const { result, message } = await removeTag(tagId);
                
                // Se filtra el array para mantener solo las etiquetas que NO coinciden con el ID
                if (result) {
                    const filtered = get().tags.filter((tags) => tags.id !== tagId);
                    set({ tags: filtered });             
                    showSuccessToast({ title: message });   
                }

                else showErrorToast({ title: message });
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