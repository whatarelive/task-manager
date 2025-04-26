// Tipo de dato que representa el Usuario
interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    password: string;
}

// Tipo de dato de la respuesta de la petición de refresh del token.
export type ResponseToken = {
    readonly access: string; // Token de accseso
    readonly refresh: string; // Token de refresh
}

// Tipo de dato de la petición de refresh del token
export type RequestToken = {
    readonly refresh: string | undefined; // Token de refresh
}

// Tipos de dato de la petición de registro de usuario.
export type UserRegisterResponse = Pick<User, "username" | "email">;

export type UserRegisterRequest = {
    first_name: string;
    last_name: string;
} & Pick<User, "email" | "username" | "password">;

// Tipos de dato de la petición de inicio de sesión.
export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = { 
    user: Omit<User, "password"> 
} & ResponseToken;