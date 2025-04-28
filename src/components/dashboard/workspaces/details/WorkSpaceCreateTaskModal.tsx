"use client"

import type { FC } from "react";
import { Plus } from "lucide-react";
import { useTagStore } from "@/store/tag-store";
import { useTaskModal } from "@/hooks/useTaskModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarModal } from "@/components/dashboard/tasks/CreateTaskCalendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Props {
    members: string[];
}

export const CreateMemberTaskModal: FC<Props> = ({ members }) => {
    const tags = useTagStore((state) => state.tags);
    const { isPending, handleAddTag, handleDateSelect, formAction } = useTaskModal(tags);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" className="items-center text-gray-400">
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

                    <Select name="member">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar miembro" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los miembros</SelectItem>
                            {members.map((member) => (
                                <SelectItem key={member} value={member}>{member}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <CalendarModal updateDate={handleDateSelect}/>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Guardando..." : "Guardar Tarea" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
