'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/schema/todo";
import { postTaskService } from "@/services/task-service";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { useState } from "react";
import TaskList from "@/components/TaskList";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
    const [taskListQ1, setTaskListQ1] = useState<Task[]>([]);
    const [taskListQ2, setTaskListQ2] = useState<Task[]>([]);
    const [taskListQ3, setTaskListQ3] = useState<Task[]>([]);
    const [taskListQ4, setTaskListQ4] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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

    async function addTask() {
        try {
            setLoading(true);
            const data = await postTaskService({title: task.title, description: task.description});
            switch (data.quadrant) {
                case "Q1":
                    setTaskListQ1([...taskListQ1, data]);
                    break;
                case "Q2":
                    setTaskListQ2([...taskListQ2, data]);
                    break;
                case "Q3":
                    setTaskListQ3([...taskListQ3, data]);
                    break;
                case "Q4":
                    setTaskListQ4([...taskListQ4, data]);
                    break;
            }
            setTask({ ...task, title: "" });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col justify-center w-[600px] mx-auto my-6 p-6 bg-white rounded-md">
            <form
                className="w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    addTask();
                }}>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            value={task.title}
                            placeholder="Tarefa"
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            disabled={loading}
                        />
                        <Button type="submit">
                            {!loading && <PlusIcon />}
                            {loading && <LoaderCircle className="animate-spin" />}
                        </Button>
                    </div>
            </form>

            <Accordion type="multiple" className="w-full mt-4">
                <AccordionItem value="q1">
                    <AccordionTrigger className="text-red-800">Q1</AccordionTrigger>
                    <AccordionContent>
                        {taskListQ1.length === 0 && <small className="flex justify-center">Sem tarefas</small>}
                        <TaskList taskList={taskListQ1} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                    <AccordionTrigger className="text-orange-500">Q2</AccordionTrigger>
                    <AccordionContent>
                        {taskListQ2.length === 0 && <small className="flex justify-center">Sem tarefas</small>}
                        <TaskList taskList={taskListQ2} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                    <AccordionTrigger className="text-green-700">Q3</AccordionTrigger>
                    <AccordionContent>
                        {taskListQ3.length === 0 && <small className="flex justify-center">Sem tarefas</small>}
                        <TaskList taskList={taskListQ3} />              
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                    <AccordionTrigger className="text-blue-700">Q4</AccordionTrigger>
                    <AccordionContent>
                        {taskListQ4.length === 0 && <small className="flex justify-center">Sem tarefas</small>}
                        <TaskList taskList={taskListQ4} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
}
