import { ListTodo } from "lucide-react";

export const Logo = () => (
    <div className="flex items-center gap-1.5 sm:gap-3">
        <span className="flex w-8 h-8 sm:h-10 sm:w-10 items-center justify-center rounded-md sm:rounded-xl bg-gradient-to-br from-primary 
            to-purple-600 text-primary-foreground shadow-lg shadow-primary/20"
        >
            <ListTodo className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text sm:text-xl font-bold text-transparent">
            TaskMaster
        </h1>
    </div>
)

