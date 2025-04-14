"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { initialTags } from "@/lib/data/taks";
import { Calendar } from "@/components/ui/calendar";

export const CreateTaskModal = () => {
  const [tags, setTags] = useState(initialTags);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();

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
                        <Input id="name" placeholder="Que necesitas hacer..." className="col-span-3" />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="grow">
                        <Select value={selectedTag || ""} onValueChange={setSelectedTag}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar etiqueta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sin etiqueta</SelectItem>
                            {tags.map((tag) => (
                              <SelectItem key={tag.id} value={tag.id}>
                                <div className="flex items-center gap-2">
                                  <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                                  <span>{tag.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grow">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Fecha límite</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Guardar Tarea</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
