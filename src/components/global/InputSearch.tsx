"use client"

import { FC, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";

export const InputSearch: FC<{ label: string }> = ({ label }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Inicializar el estado con el valor actual de la URL
    const [query, setQuery] = useState(searchParams.get("query")?.toString() || "");

    // Crear valor debounced
    const [debouncedQuery] = useDebounce(query, 500);

    // Función memoizada para actualizar la URL
    const updateSearchParams = useCallback(
        (term: string) => {
           const params = new URLSearchParams(searchParams.toString());

            if (term) params.set("query", term);
            else params.delete("query");
            
            router.push(`?${params.toString()}`, { scroll: false });
        },
        [router, searchParams],
    )

    // Efecto para actualizar la URL cuando cambia el valor debounced
    useEffect(() => {
        updateSearchParams(debouncedQuery);
    }, [debouncedQuery, updateSearchParams]);

    return (
        <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={`${label}...`}
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={label}
            />
        </div>
    )
}
