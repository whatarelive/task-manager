"use server";

import { signOut } from "@/auth.config";
import type { StateForm } from "@/interfaces/data.interfaces";


// Acción de servidor para realizar el cierre de sesión del usuario
export async function logout(): Promise<StateForm> {   
    try {
        // Llamada al método de la API de NextAuth.
        await signOut({ redirect: false });
    
        // Respuesta esperada.
        return {
            result: true,
            message: "Sesión cerrada"
        }

    } catch (error) {
        // Respuesta en caso de error.
        return {
            result: false,
            message: "Fallo el cierre de sesión",
        }
    }
}