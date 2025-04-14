import { Footer } from "@/components/dashboard/Footer";
import { NavBar } from "@/components/dashboard/NavBar";
import type { ILayoutProps } from "@/interfaces/components.interfaces";

export default function WebAppLayout({ children }: ILayoutProps) {
    return (
        <div className="min-h-screen grid auto-rows-auto">
            <NavBar/>
            <main className="min-h-[calc(100vh-128px)] flex-1 p-4 md:p-6 bg-gray-50">
                { children }
            </main>
            <Footer/>
        </div>
    )
}
