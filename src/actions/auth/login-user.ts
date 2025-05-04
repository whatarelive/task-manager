"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import type { StateForm } from "@/interfaces/data.interfaces";


// Acción de servidor para el inicio de sesión de los usuarios en la plataforma.
export async function login(formData: FormData): Promise<StateForm> { 
    // Convertir el FormData a un objeto plano para poder validarlo.
    const fields = Object.fromEntries(formData.entries());
 
    try {
        // Se realiza el login a través de API de NextAuth.
        await signIn("credentials", { ...fields, redirect: false });

        // Se notifica el inicio de sesión a la UI
        return {
            result: true,
            message: "Inicio de sesión exitoso",
        };

    } catch (error) {
        const message = error instanceof AuthError 
            ? "Credenciales incorrectas"
            : "Conexión fallida";

        return { result: false, message };
    }    
}