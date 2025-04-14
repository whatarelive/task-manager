"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

export const NavLinks = () => {
    const pathName = usePathname();

    if (!pathName.includes("/dashboard")) return <></>;

    return ( 
        <nav className="hidden items-center gap-4 md:flex">
            <Link 
                href="/dashboard" 
                className={buttonVariants({ 
                    variant: "ghost", 
                    className: pathName === "/dashboard" ? "bg-muted" : "",
                })}
            >
                Tareas
            </Link>
            <Link 
                href="/dashboard/workspaces" 
                className={buttonVariants({ 
                    variant: "ghost",
                    className: pathName.includes("/workspaces") ? "bg-muted" : "", 
                })}
            >
                Espacios
            </Link>
        </nav>
    )
}
