"use client"

import { use, type FC } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Users } from "lucide-react";
import { addWorkSpaceMember } from "@/actions/workspaces/workspace-add-member";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Props {
    workSpaceId: string;
    getWorkSpaceNoMembers: Promise<{
        error?: boolean;
        data?: string[]; 
    }>
}

export const AddMemberModal: FC<Props> = ({ workSpaceId, getWorkSpaceNoMembers }) => {
    const router = useRouter();
    const { data } = use(getWorkSpaceNoMembers);

    const handleClick = async (value: string) => {
        const { error } = await addWorkSpaceMember(workSpaceId, value);

        if (!error) {
            showSuccessToast({ title: "Miembro agregado "});
            router.refresh();
        }
        else showErrorToast({ title: "Fallo al agregar miembro" });
    }

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
                
                <ul className="overflow-y-auto w-full space-y-1 elegant-scrollbar max-h-[400px] pr-2">
                    {data && data.map((username) => (
                        <li key={username} className="flex w-full justify-between">
                            <span>{username}</span>

                            <Button variant="ghost" onClick={ async () => await handleClick(username)}>
                                <UserPlus className="w-5 h-5"/>
                            </Button>
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    )
}
