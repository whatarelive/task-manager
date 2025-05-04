import { DefaultSession } from "next-auth";
import "next-auth";
import "next-auth/jwt";

/**
 * Extiende la interfaz Session de NextAuth
 * @property {UserInfo} user - Datos del usuario
 * @property {boolean} isAuthenticated - Estado de autenticación del usuario
 */
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
            fullname: string;
        } & DefaultSession['user'];
        isAuthenticated: boolean;
    }

    interface User {
        id?: string;
        email?: string;
        username?: string;
        fullname?: string;
        createdAt?: Date;
    }
}

/**
 * Extiende la interfaz JWT de NextAuth
 * @property {User} user - Datos del usuario
 */
declare module "next-auth/jwt" {
    interface JWT {
        data: {
            id?: string;
            email?: string;
            username?: string;
            fullname?: string;
            createdAt?: Date;
        }
    }
}