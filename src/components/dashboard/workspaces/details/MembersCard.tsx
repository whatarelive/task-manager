import { Suspense, type FC } from "react";
import { getWorkSpaceNoMembers } from "@/actions/workspaces/get-workspace-users";
import { Avatar } from "@/components/ui/avatar";
import { WorkSpaceButtonRemoveMember } from "./WorkSpaceButtonRemoveMember";
import { AddMemberModal } from "@/components/dashboard/workspaces/details/WorkSpaceAddMemberModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    workSpaceId: string;
    isAdmin: boolean;
    admin?: string;
    members: string[];
}

export const MembersCard: FC<Props> = ({ workSpaceId, admin, members, isAdmin }) => {
    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <CardTitle>Miembros</CardTitle>
                <CardDescription>Colaboradores en este espacio</CardDescription>
            </CardHeader>

            <CardContent>
                <ul className="space-y-4 overflow-y-auto elegant-scrollbar max-h-[160px]">
                    {members.map((member) => (
                            <li key={member} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 text-sm">
                                        {member.charAt(0)}
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{member}</p>
                                        <p className="text-xs text-muted-foreground">
                                            { admin === member ? "Administrador" : "Usuario" }
                                        </p>
                                    </div>
                                </div>

                                {admin !== member && isAdmin && (
                                    <WorkSpaceButtonRemoveMember 
                                        workSpaceId={workSpaceId} 
                                        username={member}
                                    />
                                )}
                            </li>
                        )
                    )}    
                </ul>
            </CardContent>
            
            {isAdmin && (
                <CardFooter>
                    <Suspense fallback={<div data-slot="skeleton" className="skeleton h-9 w-full"/>}>
                        <AddMemberModal 
                            workSpaceId={workSpaceId}
                            getWorkSpaceNoMembers={getWorkSpaceNoMembers(workSpaceId)}
                        />
                    </Suspense>
                </CardFooter>
            )}
        </Card>
    )
}
