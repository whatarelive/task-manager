import type { LucideProps } from "lucide-react";
import { number, string } from "zod";

export interface FeatureDetail {
    readonly title: string;
    readonly description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly details: string[];
    readonly color: string;
}

export interface Opinions {
    readonly name: string;
    readonly job: string;
    readonly valoration: number;
    readonly opinion: string;
}

// Tipo de dato del estado previo del formulario
export interface StateForm {
    result?: boolean;
    message: string;
}

// Tipo de dato del objeto que define la etiqueta
export interface Tag {
    id: number;
    name: string;
    color: string;
}

// Tipo de dato del objeto que define la tarea
export interface Task {
    id: number;
    title:	string
    status: string;
    create_at: string;
    final_at: string;
    user: number;
    tags_detail: Tag[];
}