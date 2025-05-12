import type { FC } from "react";
import { es } from "date-fns/locale/es";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertModal } from "@/components/global/AlertModal";
import { TaskRemoveButton, TasksCheckButton } from "@/components/dashboard/tasks/TasksItemActions";
import type { UserTag, UserTask } from "@prisma/client";

interface Props {
    task: UserTask & { tags: UserTag[] };
}

export const TaskItem: FC<Props> = ({ task }) => {
    const isComplete = task.status === "COMPLETED";

    return (
        <li className={`flex items-center justify-between rounded-lg border p-4 ${isComplete ? "bg-muted" : ""}`}>
            <div className="flex items-start gap-3">
                {/* Boton para completar la tarea */}
                <TasksCheckButton id={task.id} status={isComplete}/>

                <div>
                    <div className="flex gap-2">
                        <p className={`font-medium ${isComplete ? "line-through text-muted-foreground" : ""}`}>
                            { task.title }
                        </p>
                    </div>
                    <div className="mt-2 flex flex-col md:flex-row gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{format(task.finalAt!, "PPP", { locale: es })}</span>
                        </div>

                        <ul className="flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                                <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full" style={{ background: tag.color }}/>
                                    { tag.name }
                                </Badge>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Boton para eliminar la tarea */}
            <AlertModal 
                title="Eliminar Tarea" 
                message={`Estas seguro que deseas eliminar la tarea ${task.title}`}
            >
                <TaskRemoveButton id={task.id}/>
            </AlertModal>
        </li>
    )
}