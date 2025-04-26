import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import todoApi from "@/lib/api/todo-api";
import type { UserLoginRequest, UserLoginResponse, ResponseToken } from "@/interfaces/auth.interfaces";


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
        maxAge: 23 * 60 * 60, // 23 horas en segundos
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
            // Si hay un usuario, agrega los tokens de acceso y de refresco al token JWT
            if (user) {
                token.email = user.email,
                token.username = user.username,
                token.full_name = user.full_name,
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = Date.now() + 60 * 59 * 1000; // 59 minutos de vida
                token.refreshTokenExpires = Date.now() + 23 * 60 * 60 * 1000; // 23 horas de vida
            } else {
                return token;
            }

            // Verificar si el token de refresco ha expirado
            if (token.refreshTokenExpires && Date.now() > token.refreshTokenExpires) {
                console.log("El token de refresco ha expirado - Cerrando sesión");
                // Limpiar TODOS los datos del token para forzar el cierre de sesión
                return null;
            }

            // Verificar si el token de acceso ha expirado y renovarlo usando el token de refresco
            if (token.refreshTokenExpires && token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
                try {
                    // Intenta renovar el token de acceso usando el token de refresco
                    const { data } = await todoApi.post<ResponseToken>(
                        "/user/login/refresh/", 
                        { refresh: token.refreshToken }
                    );

                    if (!data) throw new Error("Error al renovar el token");

                    // Actualiza el token de acceso y su tiempo de expiración
                    token.accessToken = data.access;
                    token.accessTokenExpires = Date.now() + 60 * 59 * 1000;

                } catch (error) {
                    console.log("Error al renovar el token de acceso", error);
                    // En caso de error, limpiar todos los datos del token
                    return {};
                }
            }

            // Retorna el token JWT modificado
            return token;
        },
        
        // Callback que se ejecuta cuando se crea la sesión
        async session({ session, token }) {  
              // Si no se encuentra el token de acceso se elimina la sesión
              if (!token.accessToken) return session;

              // Agrega los tokens de acceso y de refresco a la sesión
              session.accessToken = token.accessToken;
              session.refreshToken = token.refreshToken!;
  
              // Agrega la información del usuario a la sesión
              session.user.username = token.username;
              session.user.email = token.email!;
              session.user.full_name = token.full_name;

              // Se establece el estado de la autentificación
              session.isAuthenticated = session.accessToken ? true : false;
  
              // Retorna la sesión modificada
              return session;
        },
    },

    // Provedores de autentificación
    providers: [
        Credentials({
            async authorize(credentials) {
                // Validación de los datos
                if (!credentials) return null;

                // Convertir credentials a tipo User de forma segura
                const user = credentials as unknown as UserLoginRequest;

                // Si es un intento de login, hacer la petición al endpoint de login
                const { data } = await todoApi.post<UserLoginResponse>('/user/login/', { ...user });

                // Si no hay datos en la respuesta, retornar null
                if (!data) return null;
                
                // Retornar los datos del usuario y sus tokens de acceso
                return {
                    accessToken: data.access,
                    refreshToken: data.refresh,
                    email: data.user.email,
                    full_name: data.user.full_name,
                    username: data.user.username,
                }
            }
        })
    ]
};

// Exportación de los métodos y declaración de controladores 
export const { handlers, auth, signIn, signOut } = NextAuth( authConfig );
