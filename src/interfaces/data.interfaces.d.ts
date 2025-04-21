import type { LucideProps } from "lucide-react";

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
