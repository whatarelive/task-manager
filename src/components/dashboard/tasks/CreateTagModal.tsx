"use client";

import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const CreateTagModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full items-center text-gray-400">
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

                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Guardar Tarea</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
