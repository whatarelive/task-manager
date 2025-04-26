"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import todoApi from "@/lib/api/todo-api";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { Tag } from "@/interfaces/data.interfaces";

// Interfaz que define la estructura de la response del getTags
interface RequestTag {
    next: number;
    previous: number;
    results: Tag[];
}

// Interfaz que define la estructura de la store
interface State {
    tags: Tag[] | null;
    isLoading: boolean;
    getTags: () => Promise<void>;
    addTag: (tag: Pick<Tag, "name" | "color">) => Promise<void>;
    removeTag: (id: number) => Promise<void>;
    clearTags: () => void;
}

export const useTagStore = create<State>()(
    persist(
        (set, get) => ({
            tags: null, // estado con la información de las etiquetas
            isLoading: false, // estado de carga de la interfaz
            // Método para listar todas las etiquetas
            async getTags() {
                // Se cambia el estado de carga
                set({ isLoading: true });

                try {
                    // Petición de datos con las etiquetas a la API
                    const { data } = await todoApi.get<RequestTag>("/todo/user/tags/");
                    // Se actualiza el estado con las etiquetas
                    set({ tags: data.results });

                } catch (error) {
                    console.log(error);
                    // Se muestra mensaje de error en caso de que falle la petición
                    showErrorToast({ title: "Fallo la carga de las etiquetas" });
                }

                // Se cambia el estado de carga
                set({ isLoading: false });
            },
            // Método para agregar nuevas etiquetas
            async addTag(tag) {
                // Se cambia el estado de carga
                set({ isLoading: true });

                try {
                    // Petición de datos con las etiquetas a la API
                    const { data } = await todoApi.post<Tag>(
                        "/todo/user/tags/", 
                        { ...tag },
                    );
                    // Si la información no viene se lanza un error
                    if (!data) throw new Error("API Error");
                    // Si la información es recibida se actualiza el estado 
                    set(({ tags }) => ({ 
                        tags:  tags ? [...tags, data ] : [data],
                    }));

                } catch (error) {
                    console.log(error);
                    // Se muestra mensaje de error en caso de que falle la petición
                    showErrorToast({ title: "Fallo la carga de las etiquetas" });
                }

                // Se cambia el estado de carga
                set({ isLoading: false });
            },
            // Método para eliminar una etiqueta
            async removeTag(id) {
                // Se recuperan todas las etiquetas
                const tags = get().tags;
                // Se cambia el estado de carga
                set({ isLoading: true });

                try {
                    // Se realiza la petición de eliminación a la API
                    const { data } = await todoApi.delete<Tag>(`/${id}`);
                    // Se filtra el arreglo etiquetas para eliminar la etiqueta
                    const updateTags = tags?.filter((tag) => tag.id !== data.id);
                    // Se actualiza el estado de etiquetas
                    set({ tags: updateTags });
                    // Se muestra el mensaje de confirmación cuando se elimino
                    showSuccessToast({ title: `Eliminada la etiqueta ${data.name}`});

                } catch (error) {
                    console.log(error);
                    // Se muestra mensaje de error en caso de que falle la petición
                    showErrorToast({ title: "Fallo la eliminación de la etiqueta" });
                }

                // Se cambia el estado de carga
                set({ isLoading: false });
            },
            // Método para limpiar el estado cuando se realiza el cierre de sesión
            clearTags() {
                set({ tags: null, isLoading: false });
            },
        }),

        // Nombre para identificar la store en cache 
        { name: "tag-store" }
    ) 
)