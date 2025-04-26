"use server";

import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth.config";
import todoApi from "@/lib/api/todo-api";
import type { StateForm } from "@/interfaces/data.interfaces";

/** 
 * @description Acción de servidor para manejar el cierre de la sesión,
 * envia una petición a la API para poner en lista negra el token de refresh.
*/
export async function logout(): Promise<StateForm> {
    // Se recupera la sesión actual
    const session = await auth();
    let isclose: boolean = false;

    try {
        // Petición http al Backend
        const resp = await todoApi.post(
            // url de la request 
            "/user/logout/", 
            // data de la request
            { refresh: session?.refreshToken },
            // token de acceso para pasar la seguridad
        );

        // Si el codigo devuelto es 401 el token es invalido
        if (resp.status === 401) {
            await signOut({ redirect: false });
            // Se cierra la sesión de lado del servidor
            isclose = true;
        }

    } catch (error) {
        // Se propaga el error a la ui, para el manejo en el cliente
        console.log(error);

        return {
            result: false,
            message: "Fallo el cierre de sesión",
        }
    }

    if (isclose) {
        revalidatePath("/");

        return {
            result: true,
            message: "Sesión cerrada"
        }
    }

    // Si se realiza el cierre de sesión el backend correctamente
    // se cierra la sesión en el Frontend y redirecciona al usuario a la página principal 
    await signOut();
    
    return {
        result: true,
        message: "Sesión cerrada"
    }
}