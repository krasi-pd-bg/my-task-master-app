import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { taskService } from '../services';

export default function TaskDetailsScreen({ route, navigation }) {
  const { task } = route.params;
  const [taskData, setTaskData] = useState(task);

  const toggleCompleted = async () => {
    try {
      const updated = await taskService.update(taskData.id, {
        ...taskData,
        completed: !taskData.completed,
      });
      setTaskData(updated);
    } catch (err) {
      Alert.alert("Error", "Failed to update task status.");
    }
  };

  const handleEdit = () => {
    navigation.navigate("EditTask", { task: taskData });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await taskService.remove(taskData.id);
              navigation.pop();
            } catch (err) {
              Alert.alert("Error", "Failed to delete task.");
            }
          }
        }
      ]
    );
  };

  const formattedDate = taskData.date
    ? new Date(taskData.date).toLocaleString()
    : "N/A";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.box}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            <TouchableOpacity onPress={toggleCompleted}>
              {taskData.completed ? (
                <Ionicons name="checkmark-circle" size={22} color="#4A90E2" />
              ) : (
                <Ionicons name="ellipse-outline" size={22} color="#999" />
              )}
            </TouchableOpacity>
            <Text style={styles.statusText}>
              {taskData.completed ? "Completed" : "Not completed"}
            </Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{taskData.title}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Category</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name={taskData.category?.icon || "pricetag-outline"}
              size={18}
              color={taskData.category?.color || "#777"}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.value, { color: taskData.category?.color || "#222" }]}>
              {taskData.category?.name || "Unknown"}
            </Text>
          </View>
        </View>

        {taskData.description && (
          <View style={styles.box}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{taskData.description}</Text>
          </View>
        )}

        <View style={styles.box}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  box: {
    marginBottom: 18,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 6 },
  value: { fontSize: 17, fontWeight: '500', color: '#222' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusText: { marginLeft: 8, fontSize: 16, fontWeight: '500', color: '#222' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  button: { flex: 1, padding: 14, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  editButton: { backgroundColor: '#4A90E2' },
  deleteButton: { backgroundColor: '#E24A4A' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
