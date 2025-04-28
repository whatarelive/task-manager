"use client";

import { useActionState, type FC } from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { assingWorkSpaceTask } from "@/actions/workspaces/workspace-asing-task";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";

interface Props {
    taskId: number;
    members: string[];
}
export const WorkSpaceAssignModal: FC<Props> = ({ taskId, members }) => {
    const router = useRouter();

    const [_state, formAction, isPending] = useActionState(
        async(_prev: null | void, formData: FormData) => {
            const { error } = await assingWorkSpaceTask(taskId.toString(), formData);

            if (!error) {
                showSuccessToast({ title: "Miembro asignado a la tarea" });
                router.refresh();
            }
            else showErrorToast({ title: "Fallo la asignación" });
        }, 
        null
    );
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">
                    <Users className="h-4 w-4" /> 
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Asignar miembro</DialogTitle>
                    <DialogDescription>
                        Asigna a un miembro de tu equipo. 
                    </DialogDescription>
                </DialogHeader>
                
                <form action={formAction} className="grid gap-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <Select name="username">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filtrar por miembro" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los miembros</SelectItem>
                                {members.map((member) => (
                                    <SelectItem key={member} value={member}>{member}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Asignando..." : "Asignar Miembro" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
