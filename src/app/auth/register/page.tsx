"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { Mail, User, Lock } from "lucide-react";
import { createUser } from "@/actions/auth/create-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccessToast, showErrorToast, showInfoToast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { StateForm } from "@/interfaces/data.interfaces";


// Función auxiliar para manejar el submit y la respuesta del formulario de registro
async function submitForm(_prevState: StateForm | null, formData: FormData) {
    // Se realiza la petición de registro al servidor
    const { result, message } = await createUser(formData);
    
    // Manejo de la respuesta
    if (result) {
        showSuccessToast({ title: message });
        
        showInfoToast({ 
            title: "Notificación de Acceso", 
            description: "Para acceder a sus datos inicie sesión" 
        });

        redirect("/auth/login");
    }
    else showErrorToast({ title: message });
    
    return null;
}


export default function RegisterPage() {
    // Hook para manejar el estado del formulario.
    const [_state, formAction, isLoading] = useActionState(submitForm, null);

    return (
        <section className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl">
            {/* Formulario de inicio de sesión */}
            <Card className="border-0 shadow-none bg-gradient-to-br from-primary/5 to-purple-500/5 px-4">
                <CardHeader className="mb-4">
                    {/* Título con gradiente */}
                    <CardTitle className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-center text-3xl font-bold text-transparent">
                        Crear una cuenta
                    </CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus datos para registrarte en la plataforma
                    </CardDescription>
                </CardHeader>

                <form action={formAction} className="space-y-4">
                    <CardContent>
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="first_name" className="text-sm font-medium">
                                Nombre
                            </Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                placeholder="Juan Luis"
                                required
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="last_name" className="text-sm font-medium">
                                Apellidos
                            </Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                placeholder="Martínez Lopez"
                                required
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="username" className="text-sm font-medium">
                                Usuario
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="juanluis"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Correo electrónico
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="group relative mt-2 w-full overflow-hidden rounded-full bg-gradient-to-r 
                            from-primary to-purple-600 py-6 text-lg font-medium shadow-lg shadow-primary/20 transition-all 
                            duration-300 hover:shadow-xl hover:shadow-primary/30"
                        >
                            <span className="relative flex items-center justify-center gap-2">
                                { isLoading ? "Registrando..." : "Registrarse" }
                            </span>

                            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 
                                transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>

                        <div className="mt-6 text-center text-sm">
                            ¿Ya tienes una cuenta?{" "}

                            <Link href="/auth/login" className="text-primary hover:underline cursor-pointer">
                                Iniciar sesión
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}
