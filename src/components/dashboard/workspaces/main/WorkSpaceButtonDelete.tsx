"use client";

import { memo, type FC } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { removeWorkSpace } from "@/actions/workspaces/remove-workspace";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";

interface Props {
    workSpaceId: number;
}

export const WorkSpaceButtonDelete: FC<Props> = memo(({ workSpaceId }) => {
    const router = useRouter();

    const handleClick = async () => {
        const { error } = await removeWorkSpace(workSpaceId);

        if (!error) {
            showSuccessToast({ title: "Espacio de trabajo eliminado" });
            router.refresh();
        }
        else showErrorToast({ title: "Fallo la eliminación del espacio de trabajo" });
    }

    return (
        <Button type="submit" variant="destructive" onClick={handleClick}>
            <Trash2 className="w-6 h-6"/>
            Eliminar
        </Button>
    )
})
