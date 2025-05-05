import type { LucideProps } from "lucide-react";
import type { UserTag } from "@prisma/client";

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

// Tipo de dato del objeto que define la etiqueta del usuario
export type UserTag = Omit<UserTag, "userId">;

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

// Tipo de dato del objeto que define el espacio de trabajo
export interface WorkSpace {
    id: number;
    title: string;
    description: string;
    admin: string;
    members: string[]
}

// Tipo de dato del objeto que define la respuesta de 
// la petición GET de listar los espacios de trabajo
export interface WorkSpaceGet {
    count: number,
    results: WorkSpace[];
}