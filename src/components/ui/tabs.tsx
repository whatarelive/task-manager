"use client"

import type { FC } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

interface TriggerProps extends Props {
    value: string; 
    onClick: () => void; 
}

export const TabsList: FC<Props> = ({ className, children }) => (
    <div className={cn("grid w-full gap-2 grid-cols-3 bg-gray-100/60 rounded-md p-1", className)}>
        { children }
    </div>
)

export const TabsTrigger: FC<TriggerProps> = ({ value, ...props }) => {
    const selectedTab = useSearchParams().get("tab");

    return (
        <Button 
            variant={selectedTab !==  value ? "ghost" : "outline"} 
            {...props}
        />
    )
}