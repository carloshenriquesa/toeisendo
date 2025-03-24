'use client';
import { TaskList, Task } from "@/schema/todo";
import { useState } from "react";

export default function Home() {
    const [taskList, setTaskList] = useState<TaskList>([]);
    const [task, setTask] = useState<Task>({
        id: "",
        title: "",
        quadrant: "Q4",
        completed: false,
        createdAt: "",
        updatedAt: null,
        deletedAt: null,
        explanation: null,
        description: null,
    });

    function addTask() {
        setTaskList([...taskList, task]);
    };

    return (
        <main className="flex justify-center p-6">
            <ul>
                {taskList.map((task, index) => (
                    <li key={index}>{task.title}</li>
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addTask();
                }}>
                    <div>
                        <label>Tarefa</label>
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })} />
                    </div>
                <button type="submit">Add Task</button>
            </form>
        </main>
    );
}
