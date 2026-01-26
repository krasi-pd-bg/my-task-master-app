
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailsScreen() {

  // Временно статични данни — по-късно ще идват от route params
  const task = {
    title: "Buy groceries",
    category: "Shopping",
    description: "Buy milk, eggs, bread and some fruits.",
    date: "2026-02-15",
    time: "14:30",
    completed: false, // добавяме статус
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.heading}>Task Details</Text>

        {/* Status */}
        <View style={styles.box}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            {task.completed ? (
              <Ionicons name="checkmark-circle" size={22} color="#4A90E2" />
            ) : (
              <Ionicons name="ellipse-outline" size={22} color="#999" />
            )}
            <Text style={styles.statusText}>
              {task.completed ? "Completed" : "Not completed"}
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.box}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{task.title}</Text>
        </View>

        {/* Category */}
        <View style={styles.box}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{task.category}</Text>
        </View>

        {/* Description */}
        <View style={styles.box}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{task.description}</Text>
        </View>

        {/* Date */}
        <View style={styles.box}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{task.date}</Text>
        </View>

        {/* Time */}
        <View style={styles.box}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{task.time}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button, styles.editButton]}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>

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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
  },
  box: {
    marginBottom: 18,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  value: {
    fontSize: 17,
    fontWeight: '500',
    color: '#222',
  },

  /* Status row */
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#4A90E2',
  },
  deleteButton: {
    backgroundColor: '#E24A4A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
