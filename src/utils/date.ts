import { format, isToday, isThisYear } from 'date-fns';

export default function formatDate(date: Date) {
    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else if (isThisYear(date)) {
        return format(date, 'MM.dd HH:mm');
    } else {
        return format(date, 'yyyy.MM.dd HH:mm');
    }
}
