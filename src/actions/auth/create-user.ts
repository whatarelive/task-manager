"use server";

import z from "zod";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import prisma from "@/lib/db/prisma";
import type { StateForm } from "@/interfaces/data.interfaces";


// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    email: z.string().email().max(254),
    username: z.string().min(5).max(50).toLowerCase(),
    fullname: z.string().min(3).max(50),
    password: z.string().min(5).max(25).regex(/^[a-zA-Z0-9]+$/),
});


// Acción de servidor para el registro de usuarios en la plataforma.
export async function createUser(formData: FormData): Promise<StateForm> { 
    // Convertir el FormData a un objeto plano para poder validarlo
    const fields = Object.fromEntries(formData.entries());
    
    // Validar los datos para asegurar que cumplen con el formato requerido
    const validated = await RegisterSchema.safeParseAsync(fields);

    if (!validated.success) {
        return {
            result: false,
            message: "Credenciales incorrectas",
        }
    }

    // Hash de la contraseña del usuario
    const { password, ...rest } = validated.data;
    const passwordHash = bcryptjs.hashSync(password, 12);

    try {
        // Se guarda el usuario en la Base de Datos
        const { username } = await prisma.user.create({
            data: { ...rest, passwordHash },
            select: { username: true },
        });

        // Inicio de sesión del usuario registrado
        await signIn("credentials", { 
            username, password, 
            redirect: false 
        });

        return {
            result: true,
            message: `Usuario ${username} registrado`,
        };

    } catch (error) {
        const message = error instanceof AuthError 
            ? "Registro de usuario fallido"
            : "Conexión fallida";

        return { result: false, message };
    }    
}