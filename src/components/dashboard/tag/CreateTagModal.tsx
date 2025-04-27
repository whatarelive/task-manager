"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { createTag } from "@/actions/tags/create-tag";
import { useTagStore } from "@/store/tag-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Green", value: "#00FF00" },
    { name: "Blue", value: "#0000FF" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Cyan", value: "#00FFFF" },
    { name: "Magenta", value: "#FF00FF" },
    { name: "Orange", value: "#FFA500" },
    { name: "Purple", value: "#800080" },
    { name: "Lime", value: "#0dFF00" },
    { name: "Pink", value: "#ffc0cb" },
    { name: "Teal", value: "#008080" },
    { name: "Brown", value: "#A52A2A" },
];

export const CreateTagModal = () => {
    const addTag = useTagStore((state) => state.addTag);
    const [_state, formAction, isPending] = useActionState(
        async(_prev: void | null, formData: FormData) => {
            const { data, error, message } = await createTag(formData);

            if (!error && data) {
                addTag(data);
                showSuccessToast({ title: message });
            }
            else showErrorToast({ title: message });
        }, 
        null
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full items-center text-gray-400">
                    <Plus className="w-6 h-6"/>
                    <span>Crear Etiqueta</span> 
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form action={formAction}>
                    <DialogHeader>
                        <DialogTitle>Agregar Etiqueta</DialogTitle>
                        <DialogDescription>
                            Define como quieres que se vea la etiqueta. 
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="name">Nombre de la etiqueta</Label>
                            <Input id="name" name="name" placeholder="Como quieres definirla" className="col-span-3" />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="color">Color de la etiqueta</Label>
                            <Select name="color">
                                <SelectTrigger id="color" className="w-full">
                                    <SelectValue placeholder="Seleciona el color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        { colors.map((color) => (
                                            <SelectItem key={color.name} value={color.value} className="flex justify-between">
                                                <span className="rounded-full w-3 h-3" style={{ background: `${color.value}`}}/>
                                                <span>{ color.name }</span>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            { isPending ? "Guardando Etiqueta..." : "Guardar Etiqueta" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
