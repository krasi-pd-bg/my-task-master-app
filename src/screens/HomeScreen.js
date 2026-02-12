import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../contexts/user/UserContext';
import { taskService } from '../services';

export default function HomeScreen({ navigation }) {
  const { user } = useUserContext();

  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await taskService.getByUserId(user.id);

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

      const t = [];
      const tm = [];
      const up = [];

      data.forEach((task) => {
        const d = new Date(task.date);

        if (isSameDay(d, today)) t.push(task);
        else if (isSameDay(d, tomorrow)) tm.push(task);
        else up.push(task);
      });

      setTodayTasks(t);
      setTomorrowTasks(tm);
      setUpcomingTasks(up);

    } catch (error) {
      console.error('Error loading tasks:', error);
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompleted = async (task) => {
    try {
      await taskService.update(task.id, {
        ...task,
        completed: !task.completed
      });

      loadTasks();
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  const handleTaskPress = (task) => {
    navigation.navigate('DetailsTask', { task });
  };

  const renderTask = (task) => (
    <TouchableOpacity key={task.id} style={styles.taskBox} onPress={() => handleTaskPress(task)}>
      
      {/* Кръгче за статус */}
      <TouchableOpacity
        style={styles.statusWrapper}
        onPress={() => toggleTaskCompleted(task)}
      >
        {task.completed ? (
          <Ionicons name="checkmark-circle" size={22} color="#4A90E2" />
        ) : (
          <Ionicons name="ellipse-outline" size={22} color="#999" />
        )}
      </TouchableOpacity>

      {/* Текстова част */}
      <View style={styles.textWrapper}>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {task.title}
        </Text>

        <View style={styles.categoryRow}>
          <Ionicons
            name={task.category?.icon || "pricetag-outline"}
            size={14}
            color={task.category?.color || "#999"}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.taskCategory, { color: task.category?.color || "#777" }]}>
            {task.category?.name || "Unknown"}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Today</Text>
          {todayTasks.map(renderTask)}

          <Text style={styles.heading}>Tomorrow</Text>
          {tomorrowTasks.map(renderTask)}

          <Text style={styles.heading}>Upcoming</Text>
          {upcomingTasks.map(renderTask)}
        </ScrollView>
      )}
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

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  taskCategory: {
    fontSize: 12,
    color: '#777',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
