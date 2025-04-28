import { Suspense } from "react";
import { getTask } from "@/actions/tasks/get-tasks";
import { getTags } from "@/actions/tags/get-tags";
import { ToolsBar } from "@/components/dashboard/tasks/ToolsBar";
import { TasksList } from "@/components/dashboard/tasks/TasksList";
import { TagsCard } from "@/components/dashboard/tag/TagsCard";
import { SummaryCard } from "@/components/dashboard/tasks/SummaryCard";
import { TagsCardSkeleton } from "@/components/dashboard/tag/TagsCardSkeleton";
import { TasksListSkeleton } from "@/components/dashboard/tasks/TasksListSkeleton";

export default function Dashboard() {
    return (
        <div className="container mx-auto">
            {/* Barra de herramientas */}
            <ToolsBar/>

            {/* Sección Principal */}
            <section className="flex flex-col lg:flex-row gap-6 w-full justify-between">
                {/* Listado de tareas */}
                <Suspense fallback={<TasksListSkeleton/>}>
                    <TasksList getTasks={getTask()}/>
                </Suspense>
                
                {/* Tarjetas de estadisticas */}
                <div className="flex flex-col md:flex-row-reverse lg:flex-col gap-6 w-full lg:max-w-[450px]">
                    <SummaryCard/>

                    <Suspense fallback={<TagsCardSkeleton/>}>
                        <TagsCard getTags={getTags()}/>
                    </Suspense>
                </div>
            </section>
        </div>
    )
}
