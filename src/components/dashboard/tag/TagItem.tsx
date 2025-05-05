"use client";

import { Trash2 } from "lucide-react";
import { useTagStore } from "@/store/tag-store";
import { Button } from "@/components/ui/button";
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

            <Button variant="destructive" size="icon" onClick={async () => await removeTag(tag.id)}>
                <Trash2 className="w-8 h-8"/>
            </Button>
        </div>
    )
}
