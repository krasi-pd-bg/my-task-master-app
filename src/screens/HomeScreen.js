

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen() {

  // Временно статични данни — по-късно ще идват от API
  const todayTasks = [
    { id: 1, title: "Buy groceries", category: "Shopping" },
    { id: 2, title: "Finish project", category: "Work" },
  ];

  const tomorrowTasks = [
    { id: 3, title: "Gym workout", category: "Health" },
  ];

  const upcomingTasks = [
    { id: 4, title: "Study React Native", category: "Study" },
    { id: 5, title: "Plan weekend trip", category: "Personal" },
  ];

  const renderTask = (task) => (
    <View key={task.id} style={styles.taskBox}>
      <View>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskCategory}>{task.category}</Text>
      </View>

      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.heading}>Today</Text>
        {todayTasks.length > 0 ? todayTasks.map(renderTask) : <Text style={styles.empty}>No tasks for today</Text>}

        <Text style={styles.heading}>Tomorrow</Text>
        {tomorrowTasks.length > 0 ? tomorrowTasks.map(renderTask) : <Text style={styles.empty}>No tasks for tomorrow</Text>}

        <Text style={styles.heading}>Upcoming</Text>
        {upcomingTasks.length > 0 ? upcomingTasks.map(renderTask) : <Text style={styles.empty}>No upcoming tasks</Text>}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 10,
  },
  taskBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  taskCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  viewButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  empty: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
});
