import { TaskApplicationBackend } from "./TasksApplicationApis"

export const getTasksForCurrentUser = async () => {
    const { data } = await TaskApplicationBackend.get("/task");
    return data;
};

export const addTask = async ({ title, description }) => {
    const { data } = await TaskApplicationBackend.post("/task/add", { title, description });
    return data;
}