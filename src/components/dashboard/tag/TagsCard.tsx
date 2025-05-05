"use client";

import Image from "next/image";
import { use, useEffect, type FC } from "react";
import { useTagStore } from "@/store/tag-store";
import { showErrorToast } from "@/components/ui/sonner";
import { TagItem } from "@/components/dashboard/tag/TagItem";
import { CreateTagModal } from "@/components/dashboard/tag/CreateTagModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import type { UserTag } from "@/interfaces/data.interfaces";

interface Props {
    getTags: Promise<UserTag[]>;
}

export const TagsCard: FC<Props> = ({ getTags }) => {
    // Peticiónn de las etiquetas
    const data = use(getTags);
    const { tags, setTags } = useTagStore((state) => state);

    // Mensaje de error para cuando falla la petición de las etiquetas
    if (!data) showErrorToast({ title: "Error al cargar las etiquetas" });

    // Efecto para guardar las etiquetas en la store de las etiquetas.
    useEffect(() => {
        if (!data) return;
        setTags(data);
    }, []);

    return (
        <Card className="border-0 shadow-md w-full max-h-[420px]">
            <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>Organiza tus tareas por categorías</CardDescription>
            </CardHeader>

            <CardContent className={tags.length >= 4 ? "overflow-auto elegant-scrollbar" : ""}>
                <div className="space-y-3 pb-3">
                    { 
                        tags.length === 0 
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
