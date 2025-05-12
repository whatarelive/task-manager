"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/db/prisma";
import type { TaskStatus } from "@prisma/client";

// Obtener todas las tareas del usuario y almacenarlas en cache.
export const getTask = unstable_cache(
    // Acción del servidor.
    async (userId: string, status?: TaskStatus, tag?: string, query?: string) => {
        // Recuperar las tareas del base de datos según el estado.
        return await prisma.userTask.findMany({
            where: { 
                userId, 
                status,
                title: {
                    contains: query,
                },
                tags: {
                    some: {
                        name: {
                            contains: tag
                        }
                    }
                }
            },
            orderBy: { status: "desc" },
            include: {
                tags: true,
            }
        });
    },
    // Clave única para esta consulta.
    ["all-tasks"],
    // Opciones de caché con tareas.
    { tags: ["tasks-data"] },
);