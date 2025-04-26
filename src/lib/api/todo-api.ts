import axios from "axios";
import { auth } from "@/auth.config";

// Url que no necesitan el token para hacer una petición
const ignoreUrl = ["/user/login/", "/user/login/refresh/", "/user/register/"]

// Instancia global con la URL base configurada
const todoApi = axios.create({
    baseURL: process.env.BACKEND_URL,
})

// Interceptor para establecer el token en la request
todoApi.interceptors.request.use( async (config) => {
    if (!ignoreUrl.includes(config.url!)) {
        const sesion = await auth();
        config.headers.Authorization = `Bearer ${sesion?.accessToken}`;
    }

    return config;
});

export default todoApi;