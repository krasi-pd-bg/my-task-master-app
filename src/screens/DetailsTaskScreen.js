import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailsScreen({ route, navigation }) {
  
  // Get task data from route params
  const { task } = route.params;

  // Fallback data if no params (shouldn't happen, but good practice)
  const taskData = task || {
    title: "No task data",
    category: "Unknown",
    description: "No description available",
    date: "N/A",
    time: "N/A",
    completed: false,
  };

  const handleEdit = () => {
    // Navigate to EditTask screen and pass the task data
    navigation.navigate('EditTask', { task: taskData });
  };

  const handleDelete = () => {
    // TODO: Later add API call to delete task
    // For now, just go back and remove this screen from stack
    navigation.pop();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Status */}
        <View style={styles.box}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            {taskData.completed ? (
              <Ionicons name="checkmark-circle" size={22} color="#4A90E2" />
            ) : (
              <Ionicons name="ellipse-outline" size={22} color="#999" />
            )}
            <Text style={styles.statusText}>
              {taskData.completed ? "Completed" : "Not completed"}
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.box}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{taskData.title}</Text>
        </View>

        {/* Category */}
        <View style={styles.box}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{taskData.category}</Text>
        </View>

        {/* Description */}
        {taskData.description && (
          <View style={styles.box}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{taskData.description}</Text>
          </View>
        )}

        {/* Date */}
        {taskData.date && (
          <View style={styles.box}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{taskData.date}</Text>
          </View>
        )}

        {/* Time */}
        {taskData.time && (
          <View style={styles.box}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{taskData.time}</Text>
          </View>
        )}

        {/* Buttons */}
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
  container: {
    padding: 20,
    paddingBottom: 40,
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