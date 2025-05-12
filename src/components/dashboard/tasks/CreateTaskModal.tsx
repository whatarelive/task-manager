"use client";

import { useActionState, useCallback, useMemo, useState } from "react";
import { format } from "date-fns/format";
import { es } from "date-fns/locale/es";
import { CalendarIcon, Loader2, Minus, Plus } from "lucide-react";
import { createTask } from "@/actions/tasks/create-task";
import { useTagStore } from "@/store/tag-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { showErrorToast, showSuccessToast } from '@/components/ui/sonner';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import * as Modal from "@/components/ui/dialog";


export const CreateTaskModal = () => {
    // Estado para manejar la visibildad del modal
    const [open, setOpen] = useState(false);

    // Estados para manejar los datos del formulario
    const [isMoreTags, setIsMoreTags] = useState(false);
    const [primaryTag, setPrimaryTag] = useState<string | undefined>();
    const [finalAt, setFinalAt] = useState<Date | undefined>();

    // Arreglo de etiquetas del usuario
    const storeTags = useTagStore((state) => state.tags);

    // Arreglo con las etiquetas restantes
    const moreTags = useMemo(
        () => storeTags.filter((tag) => tag.id !== primaryTag),
        [storeTags, primaryTag]
    );

    // Hook para manejar el estado del formulario
    const [_state, formAction, isPending] = useActionState(
        async (_prev: null | void, formData: FormData) => {
            const title = formData.get("title")?.toString();
            const secondaryTag = formData.get("secondaryTag")?.toString(); 

            const { message, result } = await createTask({ 
                title, primaryTag, secondaryTag, finalAt, isMoreTags,
            });
            
            // Manejar el resultado
            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });
         
            setOpen(false);
        }, 
        null
    );

    // Función para manejar el reinicio del formulario
    const resetForm = useCallback(() => {
        setIsMoreTags(false);
        setPrimaryTag(undefined);
        setFinalAt(undefined);
    }, []);

    return (
        <Modal.Dialog open={open} onOpenChange={setOpen}>
            <Modal.DialogTrigger asChild>
                <Button className="items-center" onClick={resetForm}>
                    <Plus className="w-6 h-6"/>
                    <span>Crear Tarea</span> 
                </Button>
            </Modal.DialogTrigger>

            <Modal.DialogContent  className="sm:max-w-[425px]">
                <Modal.DialogHeader>
                    <Modal.DialogTitle>Agregar tarea</Modal.DialogTitle>
                    <Modal.DialogDescription>
                        Describe lo que necesitas hacer proximamente. 
                    </Modal.DialogDescription>
                </Modal.DialogHeader>
                
                <form action={formAction} className="grid gap-5 py-4">
                    <div className="flex flex-col items-start gap-2">
                        <Input 
                            id="title" 
                            name="title"
                            placeholder="Que necesitas hacer..." 
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="grow">
                            <Select required value={primaryTag} onValueChange={setPrimaryTag}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar etiqueta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="null">Sin etiqueta</SelectItem>
                                    {storeTags?.map((tag, index) => (
                                        <SelectItem key={index} value={tag.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full" style={{ background: tag.color }}/>
                                                <span>{tag.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {!isMoreTags && (
                            <Button variant="outline" size="icon" type="button" onClick={() => setIsMoreTags(true)}>
                                <Plus className="w-5 h-5"/>
                            </Button>
                        )}
                    </div>

                    {isMoreTags && (
                        <div className="flex gap-2">
                            <div className="grow">
                                <Select name="secondaryTag" required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccionar segunda etiqueta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="null">Sin etiqueta</SelectItem>
                                        {moreTags?.map((tag, index) => (
                                            <SelectItem key={index} value={tag.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <span className="h-3 w-3 rounded-full" style={{ background: tag.color }}/>
                                                    <span>{tag.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                        
                            <Button variant="outline" size="icon" type="button" onClick={() => setIsMoreTags(false)}>
                                <Minus className="w-5 h-5"/>
                            </Button>
                        </div>
                    )}

                    <div className="grow">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    { finalAt ? format(finalAt, "PPP", { locale: es }) : "Fecha límite" }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar 
                                    mode="single" 
                                    selected={finalAt} 
                                    onSelect={setFinalAt} 
                                    initialFocus 
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Modal.DialogFooter>
                        <Button variant="default" type="submit" disabled={isPending}>
                            { isPending && <Loader2 className="w-4 h-4 text-white animate-spin"/> }
                            { isPending ? "Guardando" : "Guardar Tarea" }
                        </Button>

                        <Modal.DialogClose type="button" variant="outline">
                            Cancelar
                        </Modal.DialogClose>
                    </Modal.DialogFooter>
                </form>
            </Modal.DialogContent>
        </Modal.Dialog>
    );
};