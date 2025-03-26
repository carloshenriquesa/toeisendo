import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { NextResponse } from 'next/server';
import { eisenhowerTool } from '@/ai/tools/eisenhower-tool';
import { Task } from '@/schema/todo';

export async function POST(request: Request) {
    const { title, description } = await request.json() as Pick<Task, 'title' | 'description'>;
    const taskData: Pick<Task, 'quadrant' | 'explanation'> = {
        quadrant: "Q4",
        explanation: "",
    };

    const groq = createGroq({
        apiKey: process.env.NEXT_PUBLIC_GROC_API_KEY,
    });

    await generateText({
        model: groq('deepseek-r1-distill-qwen-32b'),  
        prompt: title,
        tools: { eisenhowerTool },
        system: `
            Você é um assistente especializado em planejamento de tarefas baseado na matriz de Eisenhower.
            Você deve ajudar o usuário a priorizar suas tarefas de acordo com a urgência e importância de cada uma.
            
            **IMPPORTANTE**
            O retorno deve ser no formato JSON com os campos "quadrant" e "explanation", respeitando o que é retornado pela ferramenta.
        `.trim(),
        maxSteps: 5,
        onStepFinish: (result) => {
            const text = JSON.parse(result.text.replace(/```json\s*|\s*```/g, '').trim());
            Object.assign(taskData, text);
        },
    });

    try {        
        const response = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            title,
            description,
            ...taskData,
            completed: false,
            updatedAt: null,
            deletedAt: null,
        } as Task;

        return NextResponse.json(response);
    } catch(error) {
        console.error("ERROR PARSING JSON", error);
        return NextResponse.error();
    }
}
