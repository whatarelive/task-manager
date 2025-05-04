import z from "zod";
import bcryptjs from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db/prisma";


// Esquema de validación para el inicio de sesión
const AuthSchema = z.object({
    username: z.string().min(5).max(50).toLowerCase(),
    password: z.string().min(5).max(25).regex(/^[a-zA-Z0-9]+$/)
});


// Declaración de la configuración de autentificación
export const authConfig: NextAuthConfig = {
    // Configuración de las páginas de autenticación
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },

    // Configuración de la estrategia de sesión
    session: { 
        strategy: "jwt",
        maxAge: 12 * 60 * 60,
    },

    // Funciones para personalizar el comportamiento de la autenticación
    callbacks: {
        // Función que se ejecuta después del inicio de sesión para manejar la redirección
        redirect({ baseUrl }) {
            return baseUrl;
        },

        // Función que se ejecuta cuando se genera el token JWT
        jwt({ token, user }) {
            if (user.email && user.fullname && user.username) {
                token.data = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    fullname: user.fullname,
                };
            }

            return token;
        },
        
        // Función que se ejecuta cuando se crea la sesión
        session({ session, token }) {
            session.user = token.data as any;
            session.isAuthenticated = token.data.email !== undefined;
            return session;
        },
    },

    // Provedores de autentificación
    providers: [
        Credentials({
            async authorize(credentials) {
                // Validación de las credenciales proporcionadas
                const { data, success } = AuthSchema.safeParse(credentials);
                if (!success) return null; 

                // Busquedad del usuario en la base de datos
                const user = await prisma.user.findUnique({
                    where: { username: data.username },
                    select: { 
                        id: true,
                        email: true, 
                        fullname: true,
                        passwordHash: true,
                    },
                });

                // Validación de los datos del usuario
                if (!user) return null;
                if (!bcryptjs.compareSync(data.password, user.passwordHash)) return null;
                
                const { passwordHash: _, ...rest } = user;

                return { ...rest };
            }
        })
    ]
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);