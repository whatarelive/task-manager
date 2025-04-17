import NextAuth, { DefaultSession } from 'next-auth';

// Extensión del objeto de Sesión de NextAuth
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
        } & DefaultSession['user'];
        isAuthenticated: boolean;
    }
}