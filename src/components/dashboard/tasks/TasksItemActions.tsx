"use client"

import { memo, useState, useCallback, type FC } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { removeTask } from "@/actions/tasks/remove-task";
import { completeTask } from "@/actions/tasks/update-task";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const TasksCheckButton: FC<{ id: string, status: boolean }> = memo(({ id, status }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(
        async () => {
            setIsLoading(true);
            const { result, message } = await completeTask(id, status);
            setIsLoading(false);

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });
        }, 
        [id]
    );

    return isLoading ? (
        <div className="border p-1 rounded-md text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin"/> 
        </div>
    ) : (
        <Checkbox checked={status} onCheckedChange={handleClick} className="mt-1"/>
    )
})


export const TaskRemoveButton: FC<{ id: string }> = memo(({ id }) => {
    const handleClick = useCallback(
        async () => {
            const { result, message } = await removeTask(id);
           
            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });
        }, 
        [id],
    );

    return (
        <DialogClose 
            variant="destructive"
            onClick={handleClick}
            aria-label="Eliminar tarea"
        >
            <Trash2 className="w-6 h-6"/>
            Aceptar
        </DialogClose>
    )
})
