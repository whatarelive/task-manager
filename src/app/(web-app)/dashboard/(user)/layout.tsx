import { Suspense } from "react";
import { auth } from "@/auth.config";
import { getTags } from "@/actions/tags/get-tags";
import { TagsCard } from "@/components/dashboard/tag/TagsCard";
import { ToolsBar } from "@/components/dashboard/tasks/ToolsBar";
import { TagsCardSkeleton } from "@/components/dashboard/tag/TagsCardSkeleton";

interface Props {
   readonly summary: React.ReactNode;
   readonly tasks: React.ReactNode;
}

export default async function UsersLayout({ summary, tasks }: Props) {
    const session = await auth();

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
                            <TagsCard getTags={getTags(session?.user.id!)}/>
                        </Suspense>
                    </div>
                </section>
            </div>
        </div>
    )
}
