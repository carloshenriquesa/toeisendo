import { Task } from "@/schema/todo";
import { Checkbox } from "./ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { CircleHelp, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function TaskList({ taskList, onDelete }: { taskList: Task[], onDelete: (id: string) => void }) {
    return (
        <ul>
            {taskList.map((task, index) => (
                <li className="flex justify-between items-center mb-4" key={index}>
                    <div className="flex items-center space-x-2">
                        <Checkbox id={task.id} />
                        <label
                            htmlFor={task.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {task.title}
                        </label>
                    </div>
                    <div className="flex items-center">
                        <Button className="mr-2 cursor-pointer" onClick={() => onDelete(task.id)} variant="ghost">
                            <Trash2Icon />
                        </Button>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleHelp strokeWidth="1" className="cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="dark p-4">
                                <div className="flex gap-2">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium">Por que estar no quadrante {task.quadrant}?</p>
                                        <p className="text-sm text-muted-foreground">
                                            {task.explanation}
                                        </p>
                                    </div>
                                </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </li>
            ))}
        </ul>
    )
}