import { Suspense } from "react";
import { InputSearch } from "@/components/global/InputSearch";
import { WorkSpaceList } from "@/components/dashboard/workspaces/main/WorkSpaceList";
import { CreateWorkSpaceModal } from "@/components/dashboard/workspaces/main/CreateWorkSpaceModal";

interface Props {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function WorkspacesPage({ searchParams }: Props) {
    const { query = "" } = await searchParams;

    return (
        <section className="container mx-auto">
            {/* Barra de herramientas */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold">Espacios de Trabajo</h1>
                
                <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                    <InputSearch label="Buscar espacio de trabajo"/>
                    <CreateWorkSpaceModal/>
                </div>
            </div>     

            {/* Listado de Espacios de trabajo */}
            <Suspense fallback={<p>Cargando...</p>}>
                <WorkSpaceList query={query}/>
            </Suspense>
        </section>
    )
}
