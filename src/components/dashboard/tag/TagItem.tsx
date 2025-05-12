"use client";

import { Trash2 } from "lucide-react";
import { useTagStore } from "@/store/tag-store";
import { DialogClose } from "@/components/ui/dialog";
import { AlertModal } from "@/components/global/AlertModal";
import type { FC } from "react";
import type { UserTag } from "@/interfaces/data.interfaces";

export const TagItem: FC<{ tag: UserTag }> = ({ tag }) => {
    const removeTag = useTagStore((state) => state.removeTag); 

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full`} style={{ background: `${tag.color}` }} />
                <span>{ tag.name }</span>
            </div>

            <AlertModal 
                title="Eliminar Etiqueta" 
                message={`Estas seguro que deseas eliminar la etiqueta ${tag.name}`}
            >
                <DialogClose 
                    variant="destructive"
                    onClick={async () => await removeTag(tag.id)}
                    aria-label="Eliminar etiqueta"
                >
                    <Trash2 className="w-6 h-6"/>
                    Aceptar
                </DialogClose>
            </AlertModal>
        </div>
    )
}
