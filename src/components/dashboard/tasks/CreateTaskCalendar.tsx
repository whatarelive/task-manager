"use client"

import { useState, type FC } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface Props {
    updateDate: (date?: Date) => void;
}

export const CalendarModal: FC<Props> = ({ updateDate }) => {
    const [date, setDate] = useState<Date>();

    const handleClick = (date?: Date) => {
        setDate(date);
        updateDate(date);
    }

    return (
        <div className="grow">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        { date ? format(date, "PPP", { locale: es }) : "Fecha límite" }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={handleClick} 
                        initialFocus 
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}