import { tool } from 'ai';
import { z } from 'zod';
import { getCurrentDateInLocalTimezone } from '@/utils/date';

const today = getCurrentDateInLocalTimezone();

export const eisenhowerTool = tool({
    description: `
        Hoje é dia ${today}.

        Ferramenta para categorizar tarefas de acordo com a matriz de Eisenhower.
        Seguir as instruções conforme cada tópico abaixo:

        ## Quadrante 1: fazer
        É aqui que você colocará quaisquer tarefas que sejam concomitantemente urgentes e importantes. Quando uma tarefa na sua lista tiver de ser feita de imediato sob pena de acarretar consequências claras e afetar as suas metas a longo prazo, você deve colocá-la neste quadrante. 

        Não deveria haver dúvidas sobre as tarefas que pertencem a este quadrante, porque são aquelas que estão em primeiro plano e que provavelmente estão lhe causando grande estresse. 

        ## Quadrante 2: agendar
        É aqui que você põe as tarefas que não forem urgentes mas que se mostrem importantes. Como estas tarefas afetam as suas metas a longo prazo mas não precisam ser feitas de imediato, você pode agendá-las para mais tarde. 

        Trate destas tarefas logo após cuidar das tarefas no primeiro quadrante. Você pode valer-se de várias dicas de gestão do tempo para realizar as tarefas neste quadrante. Algumas estratégias úteis são o princípio de Pareto e o método Pomodoro. 

        ## Quadrante 3: delegar
        É aqui que você colocará quaisquer tarefas urgentes mas não importantes. Estas tarefas devem ser concluídas de imediato, mas não afetam as suas metas a longo prazo. 

        Como você não tem um apego pessoal a estas tarefas e elas provavelmente não requerem as suas habilidades específicas, você pode delegá-las a outros membros da sua equipe. Delegar tarefas é uma das formas mais eficientes de gerir a carga de trabalho e dar à sua equipe a oportunidade de ampliar as suas habilidades.

        ## Quadrante 4: excluir
        Depois de analisar a sua lista e distribuir as tarefas entre os três primeiros quadrantes, ainda restarão algumas. Trata-se daquelas tarefas que não eram urgentes ou importantes. 

        Estas distrações sem importância ou urgência estão simplesmente atrapalhando a realização das suas metas. Coloque estes itens restantes no quarto quadrante, que orienta a eliminar as tarefas. 

        ## IMPORTANTE
        - Considerar as tarefas já cadastradas para questões de priorização.
        - Incluir no campo explanation a justificativa da tarefa estar em determinado quadrante.

        ### Exemplos:
        - Quadrante 1: fazer
            - Prazos iminentes
            - Problemas de saúde
            - Emergências
            - Problemas de relacionamento
            - Problemas financeiros
            - Problemas de trabalho

        - Quadrante 2: agendar
            - Planejamento
            - Exercícios
            - Estudo
            - Projetos
            - Reuniões
            - Atividades de lazer
        
        - Quadrante 3: delegar
            - Tarefas rotineiras
            - Tarefas administrativas
            - Tarefas de baixa prioridade
            - Tarefas que não requerem habilidades específicas
        
        - Quadrante 4: excluir
            - Redes sociais
            - Jogos
            - Fofocas
            - Tarefas sem importância
            - Tarefas sem urgência
            - Tarefas que não contribuem para as metas a longo prazo

    `.trim(),
    parameters: z.object({
        quadrant: z.enum(['Q1', 'Q2', 'Q3', 'Q4']).describe('Quadrante da matriz de Eisenhower'),
        explanation: z.string().nullable().describe('Explicação da tarefa'),
    }),
    execute: async ({ quadrant, explanation }) => {
        return {
            quadrant,
            explanation,
        }
    }
})