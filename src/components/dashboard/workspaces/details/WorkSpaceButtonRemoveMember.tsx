"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { removeWorkSpaceMember } from "@/actions/workspaces/workspace-remove-member";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";

interface Props {
    username: string;
    workSpaceId: string; 
}

export const WorkSpaceButtonRemoveMember: FC<Props> = ({ username, workSpaceId }) => {
    const router = useRouter();

    const handleClick = async () => {
        const { error } = await removeWorkSpaceMember(workSpaceId, username);
   
        if (!error) {
            showSuccessToast({ title: "Miembro eliminado" });
            router.refresh();
        }
        else showErrorToast({ title: "Fallo la eliminación del miembro" });
    }

    return (
        <Button variant="destructive" size="icon" onClick={handleClick}>
            <Trash2 className="w-8 h-8"/>
        </Button>
    )
}
