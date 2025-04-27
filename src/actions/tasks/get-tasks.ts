"use server";

import { Task } from "@/interfaces/data.interfaces";
import todoApi from "@/lib/api/todo-api";

export async function getTask() {
    try {
        const { data } = await todoApi.get<Task[]>("/todo/user/task/");
        return { data };
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}