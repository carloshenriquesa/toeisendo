// Função para obter a data atual no fuso horário local no formato YYYY-MM-DD
export function getCurrentDateInLocalTimezone(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0, por isso +1
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}