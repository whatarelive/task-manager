"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { initialTags } from "@/lib/data/taks";
import { CreateTaskModal } from "./CreateTaskModal";

export const ToolsBar = () => {
    const [tags, setTags] = useState(initialTags);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Mis Tareas</h1>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tareas..."
                  className="pl-8"
                //   value={searchQuery}
                //   onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedTag || ""} defaultValue="" onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full md:w-44">
                  <SelectValue placeholder="Filtrar por etiqueta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las etiquetas</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                        <span>{tag.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <CreateTaskModal/>
            </div>
        </div>
    )
}
