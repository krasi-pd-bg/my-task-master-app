// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// export default function HomeScreen() {

//   const todayTasks = [
//     { id: 1, title: "Buy groceries", category: "Shopping", completed: false },
//     { id: 2, title: "Finish project", category: "Work", completed: true },
//   ];

//   const tomorrowTasks = [
//     { id: 3, title: "Gym workout", category: "Health", completed: false },
//   ];

//   const upcomingTasks = [
//     { id: 4, title: "Study React Native", category: "Study", completed: false },
//     { id: 5, title: "Plan weekend trip", category: "Personal", completed: true },
//   ];

//   const renderTask = (task) => (
//     <View key={task.id} style={styles.taskBox}>

//       {/* Status circle */}
//       <View style={styles.statusContainer}>
//         {task.completed ? (
//           <View style={styles.statusCompleted}>
//             <Text style={styles.checkmark}>✓</Text>
//           </View>
//         ) : (
//           <View style={styles.statusEmpty} />
//         )}
//       </View>

//       {/* Text */}
//       <View style={styles.taskTextContainer}>
//         <Text style={styles.taskTitle}>{task.title}</Text>
//         <Text style={styles.taskCategory}>{task.category}</Text>
//       </View>

//       {/* View button */}
//       <TouchableOpacity style={styles.viewButton}>
//         <Text style={styles.viewButtonText}>View</Text>
//       </TouchableOpacity>

//     </View>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.container}>

//         <Text style={styles.heading}>Today</Text>
//         {todayTasks.map(renderTask)}

//         <Text style={styles.heading}>Tomorrow</Text>
//         {tomorrowTasks.map(renderTask)}

//         <Text style={styles.heading}>Upcoming</Text>
//         {upcomingTasks.map(renderTask)}

//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     paddingBottom: 20,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   taskBox: {
//   backgroundColor: '#f7f7f7',
//   borderRadius: 8,
//   padding: 10,
//   marginBottom: 6,
//   borderWidth: 1,
//   borderColor: '#ddd',
//   flexDirection: 'row',
//   alignItems: 'center',
// },

// statusContainer: {
//   marginRight: 10,
// },

// statusEmpty: {
//   width: 16,
//   height: 16,
//   borderRadius: 8,
//   borderWidth: 2,
//   borderColor: '#999',
// },

// statusCompleted: {
//   width: 16,
//   height: 16,
//   borderRadius: 8,
//   backgroundColor: '#4A90E2',
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// checkmark: {
//   color: '#fff',
//   fontSize: 10,
//   fontWeight: '700',
// },

// taskTextContainer: {
//   flex: 1,
//   flexShrink: 1,
//   marginRight: 8,
// },

// taskTitle: {
//   fontSize: 16,
//   fontWeight: '600',
// },

// taskCategory: {
//   fontSize: 12,
//   color: '#666',
//   marginTop: 2,
// },

// viewButton: {
//   backgroundColor: '#4A90E2',
//   paddingVertical: 6,
//   paddingHorizontal: 10,
//   borderRadius: 6,
// },

// viewButtonText: {
//   color: '#fff',
//   fontSize: 12,
//   fontWeight: '700',
// },

// });

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

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

  const renderTask = (task) => (
    <TouchableOpacity key={task.id} style={styles.taskBox}>
      
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
