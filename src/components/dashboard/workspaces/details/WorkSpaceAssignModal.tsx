"use client";

import { useActionState, type FC } from "react";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Props {
    members: string[];
}
export const WorkSpaceAssignModal: FC<Props> = ({ members }) => {
    const [_state, formAction, isPending] = useActionState(() => {}, null);
    
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
