import { useCallback, useState } from 'react';
import { useUserContext } from '../contexts/user/UserContext';
import { categoryService } from '../services';
import { combineDateAndTime } from '../utils/dateHelpers';
import { validateTaskForm } from '../utils/validation';

// Общ form state за CreateTaskScreen и EditTaskScreen.
// initialTask (по избор) - съществуваща задача, ако формата е за Edit;
// без него полетата тръгват празни (Create).
//
// Хукът НЕ прави самия taskService.create/update вик и не навигира -
// това остава в екрана, защото Create и Edit се държат различно там
// (различна навигация след submit, различни полета в payload-а).
export function useTaskForm(initialTask = null) {
    const { user } = useUserContext();

    const [title, setTitle] = useState(initialTask?.title ?? '');
    const [category, setCategory] = useState(initialTask?.category ?? null);
    const [description, setDescription] = useState(initialTask?.description ?? '');

    const [taskDate, setTaskDate] = useState(initialTask ? new Date(initialTask.date) : null);
    const [taskTime, setTaskTime] = useState(initialTask ? new Date(initialTask.date) : null);

    const [completed, setCompleted] = useState(initialTask?.completed ?? false);

    const [categories, setCategories] = useState([]);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Само Create ползва това (reset при всеки focus на екрана).
    const resetForm = useCallback(() => {
        setTitle('');
        setCategory(null);
        setDescription('');
        setTaskDate(null);
        setTaskTime(null);
    }, []);

    const loadCategories = useCallback(async () => {
        try {
            const data = await categoryService.getByUserId(user.id);
            setCategories(data);
        } catch (err) {
            console.log('Error loading categories:', err);
        }
    }, [user.id]);

    const openPicker = () => setIsPickerOpen(true);
    const closePicker = () => setIsPickerOpen(false);
    const selectCategory = (item) => {
        setCategory(item);
        setIsPickerOpen(false);
    };

    const openDatePicker = () => setShowDatePicker(true);
    const openTimePicker = () => setShowTimePicker(true);
    const dismissDatePicker = () => setShowDatePicker(false);
    const dismissTimePicker = () => setShowTimePicker(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setTaskDate(selectedDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        setTaskTime(selectedTime);
    };

    const toggleCompleted = () => setCompleted((c) => !c);

    // requireDateTime: false за Edit - там датата/часът винаги са вече
    // избрани (идват от съществуващата задача), затова не се проверяват.
    const validate = (requireDateTime = true) =>
        validateTaskForm({ title, category, taskDate, taskTime, requireDateTime });

    // Общата част от payload-а, споделена между create и update.
    // Всеки екран добавя това, което му е специфично (completed, userId, ...task).
    const buildTaskPayload = () => {
        const combinedDate = combineDateAndTime(taskDate, taskTime);

        return {
            title: title.trim(),
            description: description.trim(),
            date: combinedDate.toISOString(),
            category: {
                id: category.id,
                name: category.name,
                icon: category.icon,
                color: category.color,
            },
        };
    };

    return {
        title, setTitle,
        category,
        description, setDescription,
        taskDate,
        taskTime,
        completed,
        categories,
        isPickerOpen,
        showDatePicker,
        showTimePicker,
        resetForm,
        loadCategories,
        openPicker, closePicker, selectCategory,
        openDatePicker, openTimePicker,
        dismissDatePicker, dismissTimePicker,
        handleDateChange, handleTimeChange,
        toggleCompleted,
        validate,
        buildTaskPayload,
    };
}
