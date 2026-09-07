import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { taskService } from '../services';
import { useTaskForm } from '../hooks/useTaskForm';
import TaskForm from '../components/TaskForm';

export default function EditTaskScreen({ route, navigation }) {
	const { task } = route.params;
	const form = useTaskForm(task);

	useEffect(() => {
		form.loadCategories();
	}, []);

	const handleSave = async () => {
		const validationError = form.validate(false);
		if (validationError) {
			Alert.alert(validationError.title, validationError.message);
			return;
		}

		const updatedTask = {
			...task,
			...form.buildTaskPayload(),
			completed: form.completed,
		};

		try {
			const result = await taskService.update(task.id, updatedTask);

			navigation.replace("DetailsTask", { task: result });
		} catch (err) {
			console.log("Error updating task:", err);
			Alert.alert("Error", "Failed to save changes.");
		}
	};

	return (
		<TaskForm
			form={form}
			heading="Edit Task"
			submitLabel="Save Changes"
			onSubmit={handleSave}
			showStatusToggle
		/>
	);
}
