"use server"

import todoApi from "@/lib/api/todo-api";
import type { Task } from "@/interfaces/data.interfaces";

export async function completeTask(id: number) {
    try {
        await todoApi.post<Task>(`/todo/user/tasks/${id}/complete/`);
        return { error: false };
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}