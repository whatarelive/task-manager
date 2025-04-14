"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { initialTags, initialTasks } from "@/lib/data/taks";

export const TagsCard = () => {
    const [tags, setTags] = useState(initialTags);
    
    return (
        <Card className="border-0 shadow-md w-full">
            <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
                <CardDescription>Organiza tus tareas por categorías</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                        <span>{tag.name}</span>
                    </div>
                    <Badge variant="outline">
                        {initialTasks.filter((task) => task.tags.some((t) => t.id === tag.id)).length}
                    </Badge>
                    </div>
                ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                <Tag className="mr-2 h-4 w-4" /> Gestionar etiquetas
                </Button>
            </CardFooter>
        </Card>
    )
}
