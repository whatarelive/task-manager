import "next-auth";
import "next-auth/jwt";

// Define las propiedades del usuario
interface UserInfo {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}

/**
   * Extiende la interfaz Session de NextAuth
   * @property {UserInfo} user - Datos del usuario
   * @property {string} accessToken - Token de acceso JWT
   * @property {string} refreshToken - Token de refresco para renovar el accessToken
   * @property {boolean} isAuthenticated - Estado de autenticación del usuario
   */
declare module "next-auth" {
    interface Session {
        user: UserInfo;
        accessToken: string;
        refreshToken: string;
        isAuthenticated: boolean;
    }

    interface User extends UserInfo {
        accessToken?: string;
        refreshToken?: string;
    }
}

/**
 * Extiende la interfaz JWT de NextAuth
 * @property {User} user - Datos del usuario
 * @property {string} accessToken - Token de acceso JWT
 * @property {number} accessTokenExpires - Timestamp de expiración del token de acceso
 * @property {string} refreshToken - Token de refresco
 * @property {number} refreshTokenExpires - Timestamp de expiración del token de refresco
 */
declare module "next-auth/jwt" {
    interface JWT extends UserInfo {
        accessToken?: string;
        accessTokenExpires?: number;
        refreshToken?: string;
        refreshTokenExpires?: number;
    }
}