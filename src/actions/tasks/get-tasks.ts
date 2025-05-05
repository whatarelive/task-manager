"use server";

export async function getTask() {
    try {
        return { data: [] };
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}