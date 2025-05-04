"use client"

import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "@/actions/auth/login-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { showErrorToast, showSuccessToast } from "@/components/ui/sonner";
import type { StateForm } from "@/interfaces/data.interfaces";


// Función auxiliar para manejar el submit y la respuesta del formulario de inicio de sesión
async function submitForm(_prevState: StateForm | null, formData: FormData) {
    // Se realiza la petición de inicio de sesión al servidor
    const { result, message } = await login(formData);

    // Manejo de la respuesta
    if (result) {
        showSuccessToast({ title: message });
        redirect("/dashboard?tab=all");
    }
    else showErrorToast({ title: message });

    return null;
}


export const LoginForm = () => {
    const [_state, formAction, isLoading] = useActionState(submitForm, null);

    return (
        <form action={formAction} className="space-y-4">
            <CardContent>
                <div className="space-y-2 mb-4">
                    <Label htmlFor="username" className="text-sm font-medium">
                        Usuario
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="username"
                            name="username"
                            type="username"
                            placeholder="juanluis"
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
                        { isLoading ? "Iniciando sesión..." : "Iniciar sesión" }
                        <ArrowRight className="min-h-5 min-w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>

                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-primary opacity-0 
                        transition-opacity duration-300 group-hover:opacity-100" />
                </Button>

                <div className="mt-6 text-center text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/auth/register" className="text-primary hover:underline cursor-pointer">
                        Regístrate aquí
                    </Link>
                </div>
            </CardFooter>
        </form>
    )
}
