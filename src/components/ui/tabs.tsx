"use client"

import { memo, useCallback, type FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
    readonly children?: React.ReactNode;
}

export const TabsList: FC<Props> = ({ children }) => (
    <div className="grid w-full gap-2 grid-cols-3 bg-gray-100/60 rounded-md p-1">
        { children }
    </div>
)

export const TabsTrigger: FC<{ value: string } & Props> = memo(({ value, children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSelectTab = useCallback(() => {
        // Creación del nuevo segmento url
        const params = new URLSearchParams(searchParams.toString());

        // Actualización de los searchParams
        params.set("tab", value);
        router.push(`?${params.toString()}`);
    }, []);

    return (
        <Button 
            variant={searchParams.get("tab") !==  value ? "ghost" : "outline"} 
            onClick={handleSelectTab}
        >
            { children }
        </Button>
    )
})