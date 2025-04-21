import { FetchAdapter } from "@/lib/fetch-adapter";

/**
 * Instancia global del FetchAdapter con la URL base configurada
 * @const {FetchAdapter}
 */
export const todoApi = new FetchAdapter({
    baseURL: process.env.BACKEND_URL,
}); 