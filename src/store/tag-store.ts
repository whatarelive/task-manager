import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTags } from "@/actions/tags/get-tags";
import { removeTag } from "@/actions/tags/remove-tag";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { Tag } from "@/interfaces/data.interfaces";


// Interfaz que define la estructura de la store
interface State {
    tags: Tag[] | null;
    isLoading: boolean;
    getTags: () => Promise<void>;
    addTag: (tag: Tag) => Promise<any >;
    removeTag: (id: number) => Promise<void>;
    clearTags: () => void;
}


// Estado global con las etiquetas del usuario
export const useTagStore = create<State>()(
    persist(
        (set) => ({
            tags: null, // estado con la información de las etiquetas
            isLoading: true, // estado de carga de la interfaz
            
            // Método para listar todas las etiquetas
            async getTags() {
                // Se cambia el estado de carga
                set({ isLoading: true });

                // Petición de datos con las etiquetas a la API
                const { error, data } = await getTags();
                
                // Se muestra mensaje de error en caso de que falle la petición
                if (error) showErrorToast({ title: "Fallo la carga de las etiquetas" });
                
                // Se actualiza el estado con las etiquetas
                else set({ tags: data });
                
                // Se cambia el estado de carga
                set({ isLoading: false });
            },

            // Método para agregar nuevas etiquetas
            async addTag(tag) {
                // Si la información es recibida se actualiza el estado 
                set(({ tags }) => ({ 
                    tags:  tags ? [tag, ...tags] : [tag],
                }));
            },

            // Método para eliminar una etiqueta
            async removeTag(id) {
                // Se realiza la petición de eliminación a la API
                const { data, error } = await removeTag(id);
                
                // Se comprueba el resultado de la server action
                if (!error && data) {
                    // Se filtra el arreglo etiquetas para eliminar la etiqueta
                    set(({ tags }) => ({ tags: tags?.filter((tag) => tag.id !== data.id) }));
                
                    // Se muestra el mensaje de confirmación cuando se elimino
                    showSuccessToast({ title: `Eliminada la etiqueta ${data.name}`});
                }                    
                
                // Se muestra mensaje de error en caso de que falle la petición
                else showErrorToast({ title: "Fallo la eliminación de la etiqueta" });
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