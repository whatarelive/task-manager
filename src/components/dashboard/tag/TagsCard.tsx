"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";
import { useTagStore } from "@/store/tag-store";
import { TagItem } from "@/components/dashboard/tag/TagItem";
import { CreateTagModal } from "@/components/dashboard/tag/CreateTagModal";
import { TagsCardSkeleton } from "@/components/dashboard/tag/TagsCardSkeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";


export const TagsCard = () => {
    const { tags, isLoading, getTags } = useTagStore();

    useEffect(() => {
        getTags();
    }, []);
    
    if (isLoading) return <TagsCardSkeleton/>;

    return (
        <Card className="border-0 shadow-md w-full max-h-[420px]">
            <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>Organiza tus tareas por categorías</CardDescription>
            </CardHeader>
            <CardContent 
                className={
                    clsx({ "overflow-auto elegant-scrollbar": tags!.length >= 4 })
                }
            >
                <div className="space-y-4">
                    { 
                        !tags || tags.length === 0 
                            ? (
                                <div className="flex flex-col items-center gap-3">
                                    <Image 
                                        src="/empty_data.svg" 
                                        alt="Empty tags"
                                        priority 
                                        width={100} height={100} 
                                        className="opacity-70"
                                    />

                                    <span className="text-gray-300">No hay etiquetas para mostrar</span>
                                </div>
                            )
                            : tags.map((tag) => <TagItem key={tag.id} tag={tag}/>) 
                    }
                </div>
            </CardContent>
            <CardFooter>
                <CreateTagModal />
            </CardFooter>
        </Card>
    )
}
