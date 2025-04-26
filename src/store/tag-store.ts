"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import todoApi from "@/lib/api/todo-api";

interface Tag {
    id: number;
    name: string;
    color: string;
}

interface RequestTag {
    next: number;
    previous: number;
    results: Tag[];
}

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
                    const { data } = await todoApi.get<RequestTag>("/");
                    
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
                        "/", 
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
                const tags = get().tags;

                try {
                    const { data } = await todoApi.delete<Tag>(`/${id}`);

                    const updateTags = tags?.filter((tag) => tag.id !== data.id);
                    
                    set({ tags: updateTags });

                    return showSuccessToast({ title: `Eliminada la etiqueta ${data.name}`});

                } catch (error) {
                    console.log(error);
                    return showErrorToast({ title: "Fallo la carga de las etiquetas" });
                }
            },

            clearTags() {
                set({ tags: null });
            },
        }),

        { name: "tag-store" }
    ) 
)