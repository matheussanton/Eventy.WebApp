export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const formatStringDateTime = (date: string) => {

    let dateObj = new Date(date);

    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
    }).format(dateObj);
};

export const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
    }).format(date);
};

export function parseDateFromString(dateString : string) {
    const [day, month, year, hour, minute] = dateString.match(/\d+/g) || [];
    return new Date(`${year}-${month}-${day}T${hour}:${minute}`);
  }
