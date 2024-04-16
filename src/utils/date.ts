import { format, isToday, isThisYear } from 'date-fns';

export default function formatDate(dateInput: any) {
    let date;
    if (dateInput instanceof Date) {
        date = dateInput;
    } else if (dateInput && typeof dateInput.toDate === 'function') {
        date = dateInput.toDate();
    } else {
        date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) {
        console.error('Invalid date value');
        return;
    }

    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else if (isThisYear(date)) {
        return format(date, 'MM.dd HH:mm');
    } else {
        return format(date, 'yyyy.MM.dd HH:mm');
    }
}
