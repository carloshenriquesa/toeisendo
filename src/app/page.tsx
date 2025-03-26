'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Quadrant, Task } from "@/schema/todo";
import { postTaskService } from "@/services/task-service";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { useState } from "react";
import QuadrantList from "@/components/QuadrantList";

export default function Home() {
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
    const [quadrantList, setQuadrantList] = useState<Quadrant[]>([{
        quadrant: "Q1",
        tasks: [],
    }, {
        quadrant: "Q2",
        tasks: [],
    }, {
        quadrant: "Q3",
        tasks: [],
    }, {
        quadrant: "Q4",
        tasks: [],
    }]);

    async function addTask() {
        try {
            setLoading(true);
            const data = await postTaskService({title: task.title, description: task.description});
            switch (data.quadrant) {
                case "Q1":
                    setQuadrantList([
                        {
                            quadrant: "Q1",
                            tasks: [...quadrantList[0].tasks, data],
                        },
                        {
                            quadrant: "Q2",
                            tasks: quadrantList[1].tasks,
                        },
                        {
                            quadrant: "Q3",
                            tasks: quadrantList[2].tasks,
                        },
                        {
                            quadrant: "Q4",
                            tasks: quadrantList[3].tasks,
                        },
                    ]);
                    break;
                case "Q2":
                    setQuadrantList([
                        {
                            quadrant: "Q1",
                            tasks: quadrantList[0].tasks,
                        },
                        {
                            quadrant: "Q2",
                            tasks: [...quadrantList[1].tasks, data],
                        },
                        {
                            quadrant: "Q3",
                            tasks: quadrantList[2].tasks,
                        },
                        {
                            quadrant: "Q4",
                            tasks: quadrantList[3].tasks,
                        },
                    ]);
                    break;
                case "Q3":
                    setQuadrantList([
                        {
                            quadrant: "Q1",
                            tasks: quadrantList[0].tasks,
                        },
                        {
                            quadrant: "Q2",
                            tasks: quadrantList[1].tasks,
                        },
                        {
                            quadrant: "Q3",
                            tasks: [...quadrantList[2].tasks, data],
                        },
                        {
                            quadrant: "Q4",
                            tasks: quadrantList[3].tasks,
                        },
                    ]);
                    break;
                case "Q4":
                    setQuadrantList([
                        {
                            quadrant: "Q1",
                            tasks: quadrantList[0].tasks,
                        },
                        {
                            quadrant: "Q2",
                            tasks: quadrantList[1].tasks,
                        },
                        {
                            quadrant: "Q3",
                            tasks: quadrantList[2].tasks,
                        },
                        {
                            quadrant: "Q4",
                            tasks: [...quadrantList[3].tasks, data],
                        },
                    ]);
                    break;
            }
            setTask({
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
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    function deleteTask(id: string) {
        setQuadrantList((prevQuadrantList) => {
            return prevQuadrantList.map((quadrant) => {
                const updatedTasks = quadrant.tasks.filter((task) => task.id !== id);
                return {
                    ...quadrant,
                    tasks: updatedTasks,
                };
            });
        });
    }

    return (
        <main className="flex flex-col justify-center max-w-[600px] mx-auto md:my-6 p-6 bg-white md:rounded-md">
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
                            maxLength={50}
                            disabled={loading}
                        />
                        <Button type="submit">
                            {!loading && <PlusIcon />}
                            {loading && <LoaderCircle className="animate-spin" />}
                        </Button>
                    </div>
            </form>

            <QuadrantList quadrantList={quadrantList} onDelete={(id) => deleteTask(id)} />
        </main>
    );
}
