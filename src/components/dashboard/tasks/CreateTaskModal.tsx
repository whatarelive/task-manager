"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTagStore } from "@/store/tag-store";
import { CalendarIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Tag } from "@/interfaces/data.interfaces";
import { createTask } from "@/actions/tasks/create-task";
import { useTakStore } from "@/store/task-store";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";

export const CreateTaskModal = () => {
    const tags = useTagStore((state) => state.tags);
    const addTask = useTakStore((state) => state.addTask);

    const [tag, setTags] = useState<number[]>([]);
    const [title, setTitle] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date>();

    const handleClick = () => {
        const id = Number(selectedTag);
        if (tag.includes(id)) return;
        setTags([...tag, id]);
    }

    const handleSubmit = async () => {
        const { data, error, message } = await createTask({ title, final_at: selectedDate, tags: tag });
    
        console.log({ data });
        

        if (!error && data) {
            addTask(data);
            showSuccessToast({ title: message });
        }

        else showErrorToast({ title: message });
    }

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
                
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-2">
                        <Input 
                            id="name" 
                            placeholder="Que necesitas hacer..." 
                            className="col-span-3" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="grow">
                            <Select value={selectedTag} onValueChange={setSelectedTag}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar etiqueta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Sin etiqueta</SelectItem>
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

                        <Button type="button" onClick={handleClick}>
                            Agregar
                        </Button>
                    </div>

                    <div className="grow">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    { selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Fecha límite</span> }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <DialogFooter>
                    <Button 
                        type="button" 
                        onClick={async (e) => { 
                            e.preventDefault();
                            await handleSubmit();
                        }}
                    >
                        Guardar Tarea
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
