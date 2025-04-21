// Tipo de dato de la respuesta de la petición de refresh del token.
export type ResponseToken = {
    readonly access: string; // Token de accseso
    readonly refresh: string; // Token de refresh
}

// Tipo de dato de la petición de refresh del token
export type RequestToken = {
    readonly refresh: string | undefined; // Token de refresh
}

// Tipo de dato de la petición de login del usuario.
export type LoginPost = {} & ResponseToken;

// Tipo de dato de la respuesta de la petición de registro.
export type UserRegister = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

// Tipo de dato de la respuesta de la petición de login.
export type UserLogin = {
    username: string,
    password: string,
}