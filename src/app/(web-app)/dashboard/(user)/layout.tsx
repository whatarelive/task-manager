import { Suspense } from "react";
import { getTags } from "@/actions/tags/get-tags";
import { TagsCard } from "@/components/dashboard/tag/TagsCard";
import { ToolsBar } from "@/components/dashboard/tasks/ToolsBar";
import { TagsCardSkeleton } from "@/components/dashboard/tag/TagsCardSkeleton";

interface Props {
   readonly summary: React.ReactNode;
   readonly tasks: React.ReactNode;
}

export default function UsersLayout({ summary, tasks }: Props) {
    return (
        <div className="bg-neutral-50 w-full p-6">
            <div className="container mx-auto">
                {/* Barra de herramientas */}
                <ToolsBar/>
    
                {/* Sección Principal */}
                <section className="flex flex-col lg:flex-row gap-6 w-full justify-between">
                    {/* Listado de tareas */}
                    { tasks }
                    
                    <div className="flex flex-col md:flex-row-reverse lg:flex-col gap-6 w-full lg:max-w-[450px]">
                        {/* Tarjeta de estadisticas */}
                        { summary }

                        {/* Tarjeta de etiquetas */}
                        <Suspense fallback={<TagsCardSkeleton/>}>
                            <TagsCard getTags={getTags()}/>
                        </Suspense>
                    </div>
                </section>
            </div>
        </div>
    )
}
