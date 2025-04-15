"use client";

import Link from "next/link";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
    return (
        <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
            <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
                <Button variant="ghost" className="flex items-center gap-1">
                    <ListTodo className="h-5 w-5" />
                    <span className="font-bold">TaskMaster</span>
                </Button>
            </Link>

            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
                    <CardDescription>Ingresa tus datos para registrarte</CardDescription>
                </CardHeader>

                <form>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">
                            {/* {isLoading ? "Registrando..." : "Registrarse"} */}
                            Registrarse
                        </Button>
                        
                        <div className="text-center text-sm">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/login" className="underline">
                                Iniciar sesión
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
