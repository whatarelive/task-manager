"use client";

import clsx from "clsx";
import Image from "next/image";
import { use, useEffect } from "react";
import { useTagStore } from "@/store/tag-store";
import { showErrorToast } from "@/components/ui/sonner";
import { CreateTagModal } from "@/components/dashboard/tag/CreateTagModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import type { Tag } from "@/interfaces/data.interfaces";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
    workSpaceId: string;
    isAdmin: boolean;
    getTags: Promise<{
        error?: boolean;
        data?: Tag[];
    }>;
}

export const TagsCard = ({ isAdmin, workSpaceId, getTags }: Props) => {
    const { data, error } = use(getTags);
    const { tags, setTags, removeTag } = useTagStore((state) => state);

    if (!data && error) showErrorToast({ title: "Error al cargar las etiquetas" });

    useEffect(() => {
        if (!data) return;
        setTags(data, workSpaceId);
    }, []);

    return (
        <Card className="border-0 shadow-md w-full max-h-[420px]">
            <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>Organiza tus tareas por categorías</CardDescription>
            </CardHeader>
            <CardContent 
                className={
                    clsx({ "overflow-auto elegant-scrollbar": tags.length >= 4 })
                }
            >
                <div className="space-y-4">
                    {!tags || tags.length === 0 ? (
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
                        : tags.map((tag) => (
                            <div key={tag.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className={`h-3 w-3 rounded-full`} style={{ background: `${tag.color}` }} />
                                    <span>{ tag.name }</span>
                                </div>

                                {isAdmin && (
                                    <Button variant="destructive" size="icon" onClick={() => removeTag(tag.id)}>
                                        <Trash2 className="w-6 h-6"/>
                                    </Button>
                                )}
                            </div>
                        )
                    )}
                </div>
            </CardContent>

            {isAdmin && (
                <CardFooter>
                    <CreateTagModal />
                </CardFooter>
            )}
        </Card>
    )
}
