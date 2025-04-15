import { Footer } from "@/components/global/Footer";
import { NavBar } from "@/components/global/nav/NavBar";
import type { ILayoutProps } from "@/interfaces/components.interfaces";

export default function WebAppLayout({ children }: ILayoutProps) {
    return (
        <div className="min-h-screen grid auto-rows-auto">
            <NavBar/>
            <main className="min-h-[calc(100vh-128px)] flex-1 bg-gray-50">
                { children }
            </main>
            <Footer/>
        </div>
    )
}
