import { Task } from "@/schema/todo";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export function postTaskService({ title, description }: Pick<Task, 'title' | 'description'>) {
    return fetch(`${baseUrl}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
        })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<Task>;
        }).catch((error) => {
            console.error(error);
            throw error;
        });
}