"use client"

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createWorkSpace } from "@/actions/workspaces/create-workspace";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const CreateWorkSpaceModal = () => {
    const router = useRouter();

    const [_state, formAction, isPending] = useActionState(
        async(_prev: null | void, formData: FormData) => {
            const { data, error, message } = await createWorkSpace(formData);
            
            if (!error && data) {
                showSuccessToast({ title: message });
                router.refresh();
            }
            else showErrorToast({ title: message });
        }, 
        null
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> 
                    Nuevo Espacio
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Espacio de Trabajo</DialogTitle>
                    <DialogDescription>
                        Crea un nuevo espacio para organizar tareas y colaborar con tu equipo.
                    </DialogDescription>
                </DialogHeader>
           
                <form id="workspace_form" action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Nombre</Label>
                        <Input id="title" name="title" placeholder="Nombre del espacio de trabajo" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Input id="description" name="description" placeholder="Descripción breve" required />
                    </div>
                </form>
           
                <DialogFooter>
                    <Button form="workspace_form" type="submit" disabled={isPending}>
                        { isPending ? "Guardando Espacio..." : "Crear Espacio" }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
