"use client"

import { memo, useState, useCallback, type FC } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { removeTask } from "@/actions/tasks/remove-task";
import { completeTask } from "@/actions/tasks/update-task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";


export const TasksCheckButton: FC<{ id: string, status: boolean }> = memo(({ id, status }) => {
    const handleClick = useCallback(
        async () => {
            const { result, message } = await completeTask(id, status);
            
            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });
        }, 
        [id]
    );

    return <Checkbox checked={status} onCheckedChange={handleClick} className="mt-1"/>
})


export const TaskRemoveButton: FC<{ id: string }> = memo(({ id }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(
        async () => {
            if (isLoading) return;

            setIsLoading(true);
            const { result, message } = await removeTask(id);
            setIsLoading(false);

            if (result) showSuccessToast({ title: message });
            else showErrorToast({ title: message });
        }, 
        [id],
    );

    return (
        <Button 
            variant="destructive" 
            size="icon" 
            disabled={isLoading} 
            onClick={handleClick}
            aria-label="Eliminar tarea"
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin"/> 
            ) : (
                <Trash2 className="w-6 h-6"/>
            )}
        </Button>
    )
})
