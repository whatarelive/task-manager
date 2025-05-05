"use client";

import type { FC } from "react";
import { es } from "date-fns/locale/es";
import { format } from "date-fns/format";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserTag, UserTask } from "@prisma/client";

interface Props {
    task: UserTask & { tags: UserTag[] };
}

export const TaskItem: FC<Props> = ({ task }) => {
    return (
        <li className={`flex items-center justify-between rounded-lg border p-4 ${task.status === "COMPLETED" ? "bg-muted" : ""}`}>
            <div className="flex items-start gap-3">
                {
                    task.status === "COMPLETED" 
                        ? <Checkbox checked className="mt-1"/>
                        : <Checkbox onCheckedChange={() => {}} className="mt-1"/>
                }

                <div>
                    <p className={`font-medium ${task.status === "COMPLETED" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{format(task.finalAt!, "PPP", { locale: es })}</span>
                        </div>

                        {task.tags.map((tag) => (
                            <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full" style={{ background: tag.color }}/>
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <Button variant="destructive" size="icon" onClick={() => {}}>
                <Trash2 className="w-6 h-6"/>
            </Button>
        </li>
    )
}
