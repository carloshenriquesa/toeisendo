import { Task } from "@/schema/todo";
import { Checkbox } from "./ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { CircleHelp } from "lucide-react";

export default function TaskList({ taskList }: { taskList: Task[] }) {
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
                </li>
            ))}
        </ul>
    )
}