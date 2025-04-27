import { memo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


export const SearchTask = memo(() => {
    const router = useRouter();
    const searchParams = useSearchParams();    
    const [search, setSearch] = useState<string>("");

    const handleSearch = (term: string) => {
        // Actualizar el estado 
        setSearch(term);

        // Crear una nueva instancia de URLSearchParams
        const params = new URLSearchParams(searchParams.toString());
            
        // Actualizar o añadir el parámetro
        if (search.length >= 1) {
            params.set("query", search);
        } else {
            params.delete("query");
        }

        // Navegar a la misma ruta pero con los parámetros actualizados
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Buscar tareas..."
                className="pl-8"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
})
