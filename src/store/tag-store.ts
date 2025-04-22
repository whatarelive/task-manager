"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@/auth.config";
import { todoApi } from "@/lib/api/todo-api";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";

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
    getTags: () => Promise<void>;
    addTag: (tag: Tag) => Promise<void>;
    removeTag: (id: number) => Promise<void>;
    clearTags: () => void;
}

export const useTagStore = create<State>()(
    persist(
        (set, get) => ({
            tags: null,

            // Métodos
            async getTags() {
                const session = await auth();

                try {
                    const { data } = await todoApi.get<RequestTag>("/", {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`
                        }
                    });
                    
                    set({ tags: data.results });

                } catch (error) {
                    console.log(error);
                    return showErrorToast({ title: "Fallo la carga de las etiquetas" });
                }
            },

            async addTag(tag) {
                const tags = get().tags;

                if (tags) set({ tags: [...tags, tag] });
                else set({ tags: [tag] });
            },

            async removeTag(id) {
                const tags = get().tags;
                const session = await auth();

                try {
                    const { data } = await todoApi.delete<Tag>(`/${id}`, {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`
                        }
                    });

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