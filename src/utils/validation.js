import { EMAIL_REGEX } from '../constants/validation';

export function validateEmail(value) {
    return EMAIL_REGEX.test(value);
}

// Валидира данните за задача преди create/update.
// Връща { title, message } за първата открита грешка, или null ако всичко е наред.
// requireDateTime: false пропуска проверката за дата/час (EditTaskScreen ги
// инициализира винаги от съществуваща задача, затова там не се проверяват).
export function validateTaskForm({ title, category, taskDate, taskTime, requireDateTime = true }) {
    if (!title.trim()) {
        return { title: 'Missing title', message: 'Please enter a task title.' };
    }

    if (!category) {
        return { title: 'Missing category', message: 'Please select a category.' };
    }

    if (requireDateTime && (!taskDate || !taskTime)) {
        return { title: 'Missing date/time', message: 'Please select date and time.' };
    }

    return null;
}
