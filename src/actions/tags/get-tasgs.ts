"use server"

import prisma from "@/lib/prisma";

export async function getTags() {
    try {
        return await prisma.tags.findMany();
    } catch (error) {
        return []
    }
}