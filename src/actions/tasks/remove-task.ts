"use server"

import todoApi from "@/lib/api/todo-api";
import type { Task } from "@/interfaces/data.interfaces";

export async function removeTask(id: number) {
    try {
        await todoApi.delete<Task>(`/todo/user/tasks/${id}/delete/`);
        return { error: false };
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}