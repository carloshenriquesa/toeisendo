import { Quadrant } from "@/schema/todo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import TaskList from "./TaskList";
import { Badge } from "./ui/badge";

export default function QuadrantList(
    { quadrantList, onDelete }:
    { quadrantList: Quadrant[], onDelete: (id: string) => void }
) {
    const color = {
        Q1: "text-green-700",
        Q2: "text-yellow-600",
        Q3: "text-blue-700",
        Q4: "text-red-800",
    };

    const defaultOpenValues = quadrantList.map((quadrant) => quadrant.quadrant);

    return (
        <Accordion type="multiple" className="w-full mt-4" defaultValue={defaultOpenValues}>
            {quadrantList.map((quadrant, index) => (
                <AccordionItem key={`${quadrant.quadrant}}-${index}`} value={quadrant.quadrant}>
                    <AccordionTrigger className={color[quadrant.quadrant as keyof typeof color]}>
                        <span className="flex items-center">
                            <p className="text-4xl opacity-30">{quadrant.quadrant}</p>
                            {quadrant.tasks.length > 0 &&
                                <Badge className="ml-4" variant={quadrant.quadrant}>
                                    {quadrant.tasks.length} {quadrant.tasks.length > 1 ? "tarefas" : "tarefa"}
                                </Badge>
                            } 
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        {quadrant.tasks.length === 0 && <small className="flex justify-center">Sem tarefas</small>}
                        <TaskList taskList={quadrant.tasks} onDelete={onDelete} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
