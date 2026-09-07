import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useUserContext } from '../contexts/user/UserContext';
import { taskService } from '../services';
import { useTaskForm } from '../hooks/useTaskForm';
import TaskForm from '../components/TaskForm';

export default function CreateTaskScreen({ navigation }) {
	const { user } = useUserContext();
	const form = useTaskForm();
	const [loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			form.resetForm();
			form.loadCategories();
		}, [])
	);

	const handleCreateTask = async () => {
		const validationError = form.validate();
		if (validationError) {
			Alert.alert(validationError.title, validationError.message);
			return;
		}

		try {
			setLoading(true);

			const newTask = {
				...form.buildTaskPayload(),
				completed: false,
				userId: user.id,
			};

			await taskService.create(newTask);

			Alert.alert('Success', 'Task created successfully.', [
				{
					text: 'OK',
					onPress: () => navigation.navigate('Home'),
				},
			]);
		} catch (error) {
			console.error('Error creating task:', error);
			Alert.alert('Error', 'Failed to create task.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<TaskForm
			form={form}
			heading="Create New Task"
			submitLabel="Create Task"
			onSubmit={handleCreateTask}
			loading={loading}
		/>
	);
}
