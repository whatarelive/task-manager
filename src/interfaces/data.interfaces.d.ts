import type { LucideProps } from "lucide-react";

export interface Feature {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly title: string;
    readonly description: string;
}

export interface FeatureDetail extends Feature {
    readonly details: string[];
    readonly color: string;
}