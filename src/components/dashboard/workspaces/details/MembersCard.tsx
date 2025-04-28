"use client";

import type { FC } from "react";
import { Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    isAdmin: boolean;
}

export const MembersCard: FC<Props> = ({ isAdmin }) => {
    return (
        <Card className="border-0 shadow-md w-full h-fit">
            <CardHeader>
                <CardTitle>Miembros</CardTitle>
                <CardDescription>Colaboradores en este espacio</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                {[{id: 1, name: "Pepe Luis", role: "admin" }].map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 text-sm">
                                {member.name.charAt(0)}
                            </Avatar>
                            <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                        <Badge variant="outline">0</Badge>
                    </div>
                ))}
                </div>
            </CardContent>
            
            {isAdmin && (
                <CardFooter>
                    <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" /> 
                        Invitar miembros
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
