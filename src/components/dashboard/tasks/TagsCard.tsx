"use client";

import { useEffect, type FC } from "react";
import { Trash2 } from "lucide-react";
import { useTagStore } from "@/store/tag-store";
import { CreateTagModal } from "@/components/dashboard/tasks/CreateTagModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import type { Tag } from "@/interfaces/data.interfaces";
import { Button } from "@/components/ui/button";


export const TagsCardSkeleton = () => {
    return (
        <div>TagsCard</div>
    )
}


export const ItemTag: FC<{ tag: Tag }> = ({ tag }) => {
    const removeTag = useTagStore((state) => state.removeTag); 

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full bg-[${tag.color}]`} />
                <span>{ tag.name }</span>
            </div>

            <Button variant="ghost" onClick={async () => await removeTag(tag.id)}>
                <Trash2 className="w-8 h-8"/>
            </Button>
        </div>
    )
}


export const TagsCard = () => {
    const { tags, isLoading, getTags } = useTagStore();

    useEffect(() => {
        getTags();
    }, []);
    
    if (isLoading) return <TagsCardSkeleton/>;

    return (
        <Card className="border-0 shadow-md w-full">
            <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>Organiza tus tareas por categorías</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    { 
                        !tags || tags.length === 0 
                            ? <></>
                            : tags.map((tag) => <ItemTag key={tag.id} tag={tag}/>) 
                    }
                </div>
            </CardContent>
            <CardFooter>
                <CreateTagModal />
            </CardFooter>
        </Card>
    )
}
