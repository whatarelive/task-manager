import Image from "next/image";
import { auth } from "@/auth.config";
import { getTask } from "@/actions/tasks/get-tasks";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskItem } from "@/components/dashboard/tasks/TaskItem";
import type { TaskStatus } from "@prisma/client";

interface Props {
    searchParams: Promise<{
        tab?: string;
        tag?: string;
        query?: string;
    }>;
}

export default async function Tasks({ searchParams }: Props) {
    // Extracción de la parametro de estado de la pestaña seleccionada.
    const params = await searchParams;
    const status = params.tab !== "all" ? (params.tab?.toUpperCase() as TaskStatus) : undefined;  
    
    const session = await auth();

    // Tareas de a mostrar en la pestaña seleccionada.
    const tasks = await getTask(session?.user.id!, status, params.tag, params.query);

    return ( 
        <section className="w-full">
            <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
            </TabsList>
            
            <section>
                {
                    tasks.length === 0 ? (
                        <div className="h-fit rounded-lg border border-dashed p-4 text-center mt-6">
                            <Image 
                                src="/empty_data.svg" 
                                alt="Empty Tasks" 
                                width={200} height={250} 
                                className="mx-auto mb-4 opacity-75"
                            />
                            <p className="text-gray-300">No hay tareas para mostrar</p>
                        </div>
                    ) : (
                        <ul className="space-y-4 mt-1 py-6 pr-4 overflow-y-auto elegant-scrollbar max-h-[600px]">
                            { tasks.map((task, index) => <TaskItem key={index} task={task}/>) }
                        </ul>
                    )
                }
            </section>
        </section>
    )
}