"use server";

import { AuthError } from "next-auth";
import { signOut } from "@/auth.config";
import type { StateForm } from "@/interfaces/data.interfaces";


// Acción de servidor para manejar el cierre de la sesión,
export async function logout(): Promise<StateForm> {
    try {
        await signOut({ redirect: false });
        
        return {
            result: true,
            message: "Sesión cerrada"
        }

    } catch (error) {
        const message = error instanceof AuthError 
            ? "Fallo el cierre de sesión"
            : "Conexión fallida";

        return { result: false, message };
    }
}