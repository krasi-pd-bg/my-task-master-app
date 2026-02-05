import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

  // Временно статични данни — по-късно ще идват от API
  const todayTasks = [
    { id: 1, title: "Buy groceries and some extra items", category: "Shopping", completed: false },
    { id: 2, title: "Finish project", category: "Work", completed: true },
  ];

  const tomorrowTasks = [
    { id: 3, title: "Gym workout", category: "Health", completed: false },
  ];

  const upcomingTasks = [
    { id: 4, title: "Study React Native", category: "Study", completed: false },
    { id: 5, title: "Plan weekend trip", category: "Personal", completed: true },
  ];

  const handleTaskPress = (task) => {
  navigation.navigate('DetailsTask', { task });
};

  const renderTask = (task) => (
    <TouchableOpacity key={task.id} style={styles.taskBox} onPress={() => handleTaskPress(task)}>
      
      {/* Status */}
      <View style={styles.statusWrapper}>
        {task.completed ? (
          <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
        ) : (
          <Ionicons name="ellipse-outline" size={20} color="#999" />
        )}
      </View>

      {/* Text */}
      <View style={styles.textWrapper}>
        <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
        <Text style={styles.taskCategory}>{task.category}</Text>
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={20} color="#999" />

    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.heading}>Today</Text>
        {todayTasks.map(renderTask)}

        <Text style={styles.heading}>Tomorrow</Text>
        {tomorrowTasks.map(renderTask)}

        <Text style={styles.heading}>Upcoming</Text>
        {upcomingTasks.map(renderTask)}

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
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },

  taskBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusWrapper: {
    marginRight: 10,
  },

  textWrapper: {
    flex: 1,
    flexShrink: 1,
    marginRight: 8,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  taskCategory: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
