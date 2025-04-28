import type { FC } from "react";
import { Avatar } from "@/components/ui/avatar";
import { AddMemberModal } from "@/components/dashboard/workspaces/details/WorkSpaceAddMemberModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    isAdmin: boolean;
    admin?: string;
    members: string[];
}

export const MembersCard: FC<Props> = ({ admin, members, isAdmin }) => {
    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <CardTitle>Miembros</CardTitle>
                <CardDescription>Colaboradores en este espacio</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {members.map((member) => (
                            <div key={member} className="flex items-center gap-2">
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
                        )
                    )}    
                </div>
            </CardContent>
            
            {isAdmin && (
                <CardFooter>
                    <AddMemberModal/>
                </CardFooter>
            )}
        </Card>
    )
}
