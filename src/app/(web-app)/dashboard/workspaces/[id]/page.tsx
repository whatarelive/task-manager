import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/auth.config";
import { getWorkSpaceInfo } from "@/actions/workspaces/get-workspace-info";
import { getWorkSpacesTags } from "@/actions/workspaces/get-workspace-tags";
import { getWorkSpacesTasks } from "@/actions/workspaces/get-workspace-tasks";
import { TagsCard } from "@/components/dashboard/workspaces/details/WorksSpaceTagsCard";
import { ToolsBar } from "@/components/dashboard/workspaces/details/WorkSpaceToolsBar";
import { MembersCard } from "@/components/dashboard/workspaces/details/MembersCard";
import { TagsCardSkeleton } from "@/components/dashboard/tag/TagsCardSkeleton";
import { WorkSpaceTasksList } from "@/components/dashboard/workspaces/details/WorkSpaceTasksList";
import { TasksListSkeleton } from "@/components/dashboard/tasks/TasksListSkeleton";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function WorkspaceInfoPage({ params }: Props) {
    const { id } = await params;
    const { data } = await getWorkSpaceInfo(id);
    
    if (!data) return notFound();

    const session = await auth();
    const isAdminUser = data?.admin === session?.user.username;

    return (
        <section className="container mx-auto">
            <ToolsBar 
                isAdmin={isAdminUser} 
                members={data.members} 
                workSpaceName={data.title}
            />

            <div className="flex flex-col lg:flex-row gap-6 w-full justify-between">
                <Suspense fallback={<TasksListSkeleton/>}>
                    <WorkSpaceTasksList 
                        isAdmin={isAdminUser} 
                        workSpaceId={id} 
                        members={data.members}
                        getTasks={getWorkSpacesTasks(id)}
                    />
                </Suspense>

                <section className="flex flex-col md:flex-row-reverse lg:flex-col gap-6 w-full lg:max-w-[450px]">
                    <MembersCard 
                        admin={data.admin} 
                        workSpaceId={data.id.toString()}
                        members={data.members} 
                        isAdmin={isAdminUser}
                    />
                    
                    <Suspense fallback={<TagsCardSkeleton/>}>
                        <TagsCard 
                            isAdmin={isAdminUser} 
                            workSpaceId={id} 
                            getTags={getWorkSpacesTags(id)} 
                        />
                    </Suspense>
                </section>
            </div>
        </section>
    )
}
