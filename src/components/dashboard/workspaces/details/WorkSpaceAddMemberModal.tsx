"use client"

import { useActionState } from "react";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";


export const AddMemberModal = () => {
    const [_state, formAction, isPending] = useActionState(
        async () => {}, 
        null
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" className="w-full items-center text-gray-400">
                    <Users className="mr-2 h-4 w-4" /> 
                    Invitar miembros
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar miembro</DialogTitle>
                    <DialogDescription>
                        Comparte tu trabajo con nuevos miembros. 
                    </DialogDescription>
                </DialogHeader>
                
                <form action={formAction} className="grid gap-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <Input 
                            id="username" 
                            name="username"
                            placeholder="Quien deseas agregar..." 
                            className="col-span-3"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            { isPending ? "Agregando..." : "Agregar Miembro" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
