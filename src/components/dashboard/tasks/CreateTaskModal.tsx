"use client";

import { Plus } from "lucide-react";
import { useTagStore } from "@/store/tag-store";
import { useTaskModal } from "@/hooks/useTaskModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarModal } from "@/components/dashboard/tasks/CreateTaskCalendar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const CreateTaskModal = () => {
    // Arreglo de etiquetas del usuario
    const { tags, workSpaceId } = useTagStore();
    // Custom hook para manejar la obtención de datos de los campos del modal
    const { isPending, formAction, handleAddTag, handleDateSelect } = useTaskModal(tags, workSpaceId);

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

                    <CalendarModal updateDate={handleDateSelect}/>

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