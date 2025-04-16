import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FC } from "react";

interface Props {
    href: string;
    label: string;
    icon?: boolean;
}

export const LinkButton: FC<Props> = ({ href, label, icon }) => {
    return (
        <Link 
            href={href}
            className="group inline-flex relative overflow-hidden rounded-full bg-gradient-to-r from-primary 
            to-purple-600 px-8 py-2 text-white text-lg shadow-lg shadow-primary/20 transition-all duration-300 
            hover:shadow-xl hover:shadow-primary/30"
        >
            <span className="relative z-10 flex items-center gap-2">
                { label }
                { icon && <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"/> }
            </span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
    )
}
