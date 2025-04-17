import z from "zod";
import bcryptjs from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

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
        maxAge: 24 * 60 * 60, // 24 horas en segundos
    },

    // Callbacks para personalizar el comportamiento de la autenticación
    callbacks: {
        // Callback que se ejecuta después del inicio de sesión para manejar la redirección
        async redirect({ baseUrl }) {
            // Redirigir a la ruta raíz después del inicio de sesión
            return baseUrl;
        },

        // Callback que se ejecuta cuando se genera el token JWT
        async jwt({ token, user }) {
            if (user) {
                token.data = user;
            }

            // Retorna el token JWT modificado
            return token;
        },
        
        // Callback que se ejecuta cuando se crea la sesión
        async session({ session, token }) {  
            // Se agrega la información del usuario a la sesión
            session.user = token.data as any;

            session.isAuthenticated = session.user !== undefined;

            // Retorna la sesión modificada
            return session;
        },
    },

    // Provedores de autentificación
    providers: [
        Credentials({
            async authorize(credentials) {
                // Validación de los datos
                const { success, data } = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!success) return null;

                const { email, password } = data;

                // Buscar el usuario usando el email.
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
                if (!user) return null;

                // Comparar las contraseñas
                if( !bcryptjs.compareSync(password, user.password) ) return null;

                // Regresar el usuario sin el password
                const { password: _, ...rest } = user;

                return rest;
            }
        })
    ]
};

// Exportación de los métodos y declaración de controladores 
export const { handlers, auth, signIn, signOut } = NextAuth( authConfig );
