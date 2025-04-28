import Link from "next/link";
import type { FC } from "react";
import { Briefcase } from "lucide-react";
import { getWorkSpaces } from "@/actions/workspaces/get-workspaces";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const WorkSpaceList: FC<{ query: string }> = async ({ query }) => {
    const { data, error } = await getWorkSpaces(query);
    
    if (error || !data) {
        return (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <Briefcase className="mb-4 h-10 w-10 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">
                    No hay espacios de trabajo
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                    Crea tu primer espacio de trabajo para comenzar a organizar tus tareas y colaborar con otros.
                </p>
            </div>
        )
    }

    return (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                data.results.map((workspace) => (
                    <Card key={workspace.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle>{ workspace.title }</CardTitle>
                            <CardDescription>{ workspace.description }</CardDescription>
                        </CardHeader>

                        <CardContent className="flex justify-between">
                            <div className="flex -space-x-2">
                                {workspace.members.slice(0, 3).map((member) => (
                                    <Avatar key={member} className="border-2 border-background">
                                        { member.charAt(0).toLocaleUpperCase() }
                                    </Avatar>
                                ))}
                                
                                {workspace.members.length > 3 && (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full 
                                        border-2 border-background bg-muted text-xs font-medium"
                                    >
                                        +{workspace.members.length - 3}
                                    </div>
                                )}
                            </div>

                            <Link href={`/dashboard/workspaces/${workspace.id}`}>
                                <Button variant="outline">Ver Tareas</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            }
        </ul>
    )
}
