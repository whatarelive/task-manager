"use server";

import { isAxiosError } from "axios";
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
    // Variable auxiliar para realizar la revalidación de la ruta luego del cierre de sesión
    let isclose: boolean = false;

    try {
        // Petición http al Backend
        await todoApi.post(
            // url de la request 
            "/user/logout/", 
            // data de la request
            { refresh: session?.refreshToken },
            // token de acceso para pasar la seguridad
        );

        // Se cierra la sesión en el servidor del frontend
        await signOut({ redirect: false });
        isclose = true;
        
    } catch (error) {
        // Se propaga el error a la ui, para el manejo en el cliente
        console.log(error);
        
        // Si el error no es de axios se notifica
        if (!isAxiosError(error)) {
            return {
                result: false,
                message: "Fallo el cierre de sesión",
            }
        }

        // Si el codigo devuelto es 401 el token es invalido
        if (error.response?.status === 401) {
            // Se cierra la sesión de lado del servidor del frontend
            await signOut({ redirect: false });
            // Se
            isclose = true;
        } 

        // Mensaje de error si hay un fallo en la petición (statusCode !== 401)
        return {
            result: false,
            message: "Error de conexión",
        }
    }

    // Se actualiza la información de la página principal
    if (isclose) revalidatePath("/");

    // Mensaje de confirmación de cierre de la sesión
    return {
        result: true,
        message: "Sesión cerrada"
    }
}