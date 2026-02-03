
export function getDateString(date: Date): string {
    return date.toISOString().split('T')[0] as string
}