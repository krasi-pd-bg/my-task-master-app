// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Modal,
//   FlatList,
//   Platform
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function EditTaskScreen() {
//   // Временно статични данни — по-късно ще идват от route.params
//   const initialTask = {
//     title: "Buy groceries",
//     category: "Shopping",
//     description: "Buy milk, eggs, bread and some fruits.",
//     date: new Date("2026-02-15"),
//     time: new Date("2026-02-15T14:30:00"),
//   };

//   const [title, setTitle] = useState(initialTask.title);
//   const [category, setCategory] = useState(initialTask.category);
//   const [description, setDescription] = useState(initialTask.description);
//   const [taskDate, setTaskDate] = useState(initialTask.date);
//   const [taskTime, setTaskTime] = useState(initialTask.time);

//   const [isPickerOpen, setIsPickerOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const categories = [
//     "Work",
//     "Personal",
//     "Study",
//     "Shopping",
//     "Health",
//     "Other"
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.container}>
        
//         <Text style={styles.heading}>Edit Task</Text>

//         {/* Title */}
//         <Text style={styles.label}>Title</Text>
//         <TextInput
//           value={title}
//           onChangeText={setTitle}
//           placeholder="Enter task title"
//           style={styles.input}
//         />

//         {/* Category */}
//         <Text style={styles.label}>Category</Text>
//         <TouchableOpacity
//           style={styles.selector}
//           onPress={() => setIsPickerOpen(true)}
//         >
//           <Text style={styles.selectorText}>
//             {category ? category : "Select Category"}
//           </Text>
//         </TouchableOpacity>

//         {/* Category Picker Modal */}
//         <Modal visible={isPickerOpen} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalBox}>
//               <Text style={styles.modalTitle}>Choose Category</Text>

//               <FlatList
//                 data={categories}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.modalItem}
//                     onPress={() => {
//                       setCategory(item);
//                       setIsPickerOpen(false);
//                     }}
//                   >
//                     <Text style={styles.modalItemText}>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//               />

//               <TouchableOpacity
//                 style={styles.modalCancel}
//                 onPress={() => setIsPickerOpen(false)}
//               >
//                 <Text style={styles.modalCancelText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* Description */}
//         <Text style={styles.label}>Description</Text>
//         <TextInput
//           value={description}
//           onChangeText={setDescription}
//           placeholder="Describe your task..."
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         {/* Date */}
//         <Text style={styles.label}>Task Date</Text>
//         <TouchableOpacity
//           style={styles.selector}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text style={styles.selectorText}>
//             {taskDate ? taskDate.toLocaleDateString() : "Select Date"}
//           </Text>
//         </TouchableOpacity>

//         {/* Time */}
//         <Text style={styles.label}>Task Time</Text>
//         <TouchableOpacity
//           style={styles.selector}
//           onPress={() => setShowTimePicker(true)}
//         >
//           <Text style={styles.selectorText}>
//             {taskTime
//               ? taskTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//               : "Select Time"}
//           </Text>
//         </TouchableOpacity>

//         {/* Save Button */}
//         <TouchableOpacity style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>

//       </ScrollView>

//       {/* Date Picker */}
//       {showDatePicker && (
//         <DateTimePicker
//           value={taskDate || new Date()}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) setTaskDate(selectedDate);
//           }}
//         />
//       )}

//       {/* Time Picker */}
//       {showTimePicker && (
//         <DateTimePicker
//           value={taskTime || new Date()}
//           mode="time"
//           display="default"
//           onChange={(event, selectedTime) => {
//             setShowTimePicker(false);
//             if (selectedTime) setTaskTime(selectedTime);
//           }}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 25,
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 15,
//     marginBottom: 5,
//     fontWeight: '600',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   selector: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     padding: 14,
//     backgroundColor: '#f2f2f2',
//   },
//   selectorText: {
//     fontSize: 16,
//     color: '#555',
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 15,
//   },
//   modalItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalItemText: {
//     fontSize: 16,
//   },
//   modalCancel: {
//     marginTop: 15,
//     padding: 12,
//     backgroundColor: '#ddd',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   modalCancelText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   saveButton: {
//     backgroundColor: '#4A90E2',
//     padding: 16,
//     borderRadius: 10,
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });

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
import { Ionicons } from '@expo/vector-icons';

export default function EditTaskScreen() {
  // Временно статични данни — по-късно ще идват от route.params
  const initialTask = {
    title: "Buy groceries",
    category: "Shopping",
    description: "Buy milk, eggs, bread and some fruits.",
    date: new Date("2026-02-15"),
    time: new Date("2026-02-15T14:30:00"),
    completed: false,
  };

  const [title, setTitle] = useState(initialTask.title);
  const [category, setCategory] = useState(initialTask.category);
  const [description, setDescription] = useState(initialTask.description);
  const [taskDate, setTaskDate] = useState(initialTask.date);
  const [taskTime, setTaskTime] = useState(initialTask.time);
  const [completed, setCompleted] = useState(initialTask.completed);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
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
        
        <Text style={styles.heading}>Edit Task</Text>

        {/* Status */}
        <Text style={styles.label}>Status</Text>
        <TouchableOpacity
          style={styles.statusBox}
          onPress={() => setCompleted(!completed)}
        >
          {completed ? (
            <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#999" />
          )}
          <Text style={styles.statusText}>
            {completed ? "Completed" : "Not completed"}
          </Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
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

        {/* Category Picker Modal */}
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
          value={description}
          onChangeText={setDescription}
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

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    marginBottom: 25,
  },

  /* Status */
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
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

  saveButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
