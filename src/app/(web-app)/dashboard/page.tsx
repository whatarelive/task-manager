import { ToolsBar } from "@/components/dashboard/tasks/ToolsBar";
import { TasksList } from "@/components/dashboard/tasks/TasksList";
import { TagsCard } from "@/components/dashboard/tag/TagsCard";
import { SummaryCard } from "@/components/dashboard/tasks/SummaryCard";

export default function Dashboard() {
    return (
        <div className="container mx-auto">
            {/* Barra de herramientas */}
            <ToolsBar/>

            {/* Sección Principal */}
            <section className="flex flex-col lg:flex-row gap-6 w-full justify-between">
                {/* Listado de tareas */}
                <TasksList/>

                {/* Tarjetas de estadisticas */}
                <div className="flex flex-col md:flex-row-reverse lg:flex-col gap-6 w-full lg:max-w-[450px]">
                    <SummaryCard/>
                    <TagsCard/>
                </div>
            </section>
        </div>
    )
}
