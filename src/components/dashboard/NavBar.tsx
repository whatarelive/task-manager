import Link from "next/link";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function NavBar() {
    return (
        <header className="sticky top-0 z-10 h-16 border-b bg-background/95 backdrop-blur shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <ListTodo className="h-6 w-6" />
                    <span className="text-xl font-bold">TaskMaster</span>
                </div>
                <nav className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="bg-muted">
                            Tareas
                        </Button>
                    </Link>
                    <Link href="/workspaces">
                        <Button variant="ghost">Espacios</Button>
                    </Link>
                    <Avatar>
                        <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                </nav>
            </div>
      </header>
    )
}
