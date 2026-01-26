import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateTaskScreen() {
  const [category, setCategory] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [taskDate, setTaskDate] = useState(null);
  const [taskTime, setTaskTime] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const categories = [
    "Work",
    "Personal",
    "Study",
    "Shopping",
    "Health",
    "Other"
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Create New Task</Text>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Enter task title"
          style={styles.input}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setIsPickerOpen(true)}
        >
          <Text style={styles.selectorText}>
            {category ? category : "Select Category"}
          </Text>
        </TouchableOpacity>

        {/* Custom Picker Modal */}
        <Modal visible={isPickerOpen} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Choose Category</Text>

              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setCategory(item);
                      setIsPickerOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setIsPickerOpen(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Describe your task..."
          style={[styles.input, styles.textArea]}
          multiline
        />

        {/* Date */}
        <Text style={styles.label}>Task Date</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.selectorText}>
            {taskDate ? taskDate.toLocaleDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>

        {/* Time */}
        <Text style={styles.label}>Task Time</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.selectorText}>
            {taskTime
              ? taskTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : "Select Time"}
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={taskDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setTaskDate(selectedDate);
          }}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={taskTime || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTaskTime(selectedTime);
          }}
        />
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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selector: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#f2f2f2',
  },
  selectorText: {
    fontSize: 16,
    color: '#555',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
