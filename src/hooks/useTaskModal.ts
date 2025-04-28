"use client";

import { useRouter } from "next/navigation";
import { useActionState, useRef } from "react";
import { createTask } from "@/actions/tasks/create-task";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/components/ui/sonner";
import type { Tag } from "@/interfaces/data.interfaces";

export function useTaskModal(tags: Tag[]) {
    const router = useRouter();
    // Referencia de los ids de las etiquetas
    const tagsRef = useRef<number[]>([]);
    // Referencia del valor del calendario
    const dateRef = useRef<Date | undefined>(undefined);
    
    // Hook para manejar el estado del formulario
    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            // Obtener los datos del formulario
            const title = formData.get('title') as string;
            const tags = tagsRef.current;
            const final_at = dateRef.current;
            
            // Llamar a la acción del servidor
            const { message, data, error } = await createTask({ title, final_at, tags });
            
            // Manejar el resultado
            if (!error && data) {
                // Mensaje de confirmación
                showSuccessToast({ title: message });
                
                // Limpiar los refs
                tagsRef.current = [];
                dateRef.current = undefined;

                router.refresh();
            } 

            // Mensaje de error si falla la acción
            else showErrorToast({ title: message });
        }, 
        null
    );

    // Función auxiliar para agregar las etiquetas a la referencia 
    const handleAddTag = () => {
        // Se recupera el elemento seleccionado en el elemento select. 
        const selectElement = document.querySelector('select[name="tag"]') as HTMLSelectElement;
        
        if (!selectElement) return;
        
        // Evaluación del valor recuperado
        const id = Number(selectElement.value);
        if (isNaN(id) || id === 0 || tagsRef.current.includes(id)) return;
        
        // Se actualiza los datos de la referencia
        tagsRef.current = [...tagsRef.current, id];

        // Confirmación visual para mostrar las etiquetas seleccionadas
        const tag = tags.find((tag) => tag.id === id);
        showInfoToast({ title: `Etiqueta ${tag?.name} agregada`});
    };

    // Función auxiliar para recuperar la fecha del componente Calendar
    const handleDateSelect = (date: Date | undefined) => dateRef.current = date;

    return {
        isPending,
        formAction,
        handleAddTag,
        handleDateSelect
    }
}