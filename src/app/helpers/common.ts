/**
 * Parsing JSON string to object/string
 * 
 * @param data any 
 * @returns any
 */
export function parsingJson(data: any): any {
    try {
        return JSON.parse(data);
    } catch(e) {
        return null;
    }
}

/**
 * Convert string to time or date time.
 * 
 * @param datetime 
 * @returns string
 */
export function formatDateTime(datetime: string): string {
    const date = new Date(datetime);
    const now = new Date();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (
        date.getFullYear() !== now.getFullYear() ||
        date.getMonth() !== now.getMonth() ||
        date.getDate() !== now.getDate()
    ) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.getMonth().toString().padStart(2, '0');
        const year = date.getFullYear().toString().padStart(2, '0');

        const dayMonthYear = `${day}/${month}/${year} ${hours}:${minutes}`;
        return dayMonthYear;
    }

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}