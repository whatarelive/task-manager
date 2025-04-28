"use client";

import { useRouter } from "next/navigation";
import { type FC, useRef, useActionState, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Plus } from 'lucide-react';
import { createTask } from "@/actions/tasks/create-task";
import { useTagStore } from "@/store/tag-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/components/ui/sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export const CalendarModal: FC<{ dateRef: (date?: Date) => void }> = ({ dateRef }) => {
    const [date, setDate] = useState<Date>();

    const handleClick = (date?: Date) => {
        setDate(date);
        dateRef(date);
    }

    return (
        <div className="grow">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        { 
                            date 
                                ? format(date, "PPP", { locale: es }) 
                                : <span>Fecha límite</span>
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={handleClick} 
                        initialFocus 
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


export const CreateTaskModal = () => {
    const router = useRouter();
    // Referencia de los ids de las etiquetas
    const tagsRef = useRef<number[]>([]);
    // Referencia del valor del calendario
    const dateRef = useRef<Date | undefined>(undefined);
    // Arreglo de etiquetas del usuario
    const tags = useTagStore((state) => state.tags);
    
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

    // Función auxiliar para 
    const handleDateSelect = (date: Date | undefined) => dateRef.current = date;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="items-center text-gray-400">
                    <Plus className="w-6 h-6"/>
                    <span>Crear Tarea</span> 
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar tarea</DialogTitle>
                    <DialogDescription>
                        Describe lo que necesitas hacer proximamente. 
                    </DialogDescription>
                </DialogHeader>
                
                <form action={formAction} className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-2">
                        <Input 
                            id="title" 
                            name="title"
                            placeholder="Que necesitas hacer..." 
                            className="col-span-3"
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="grow">
                            <Select name="tag">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar etiqueta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Sin etiqueta</SelectItem>
                                    {tags?.map((tag) => (
                                        <SelectItem key={tag.id} value={tag.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full" style={{ background: tag.color }}/>
                                                <span>{tag.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="button" onClick={handleAddTag}>
                            Agregar
                        </Button>
                    </div>

                    <CalendarModal dateRef={handleDateSelect}/>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando..." : "Guardar Tarea" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};