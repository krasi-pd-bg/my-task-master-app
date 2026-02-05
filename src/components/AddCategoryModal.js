import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddCategoryModal({
  visible,
  onClose,
  onSave,
  editMode = false,
  initialData = null
}) {
  const icons = [
    "briefcase-outline",
    "person-outline",
    "book-outline",
    "cart-outline",
    "heart-outline",
    "star-outline",
    "alarm-outline",
    "calendar-outline",
  ];

  const colors = [
    "#4A90E2",
    "#E24A4A",
    "#8E44AD",
    "#27AE60",
    "#E67E22",
    "#2C3E50",
    "#16A085",
    "#D35400",
  ];

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  // Попълване при EDIT
  useEffect(() => {
    if (editMode && initialData) {
      setName(initialData.name);
      setSelectedIcon(initialData.icon);
      setSelectedColor(initialData.color);
    } else {
      setName("");
      setSelectedIcon(icons[0]);
      setSelectedColor(colors[0]);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          <Text style={styles.title}>
            {editMode ? "Edit Category" : "Add Category"}
          </Text>

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Category name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* Icon */}
          <Text style={styles.label}>Icon</Text>
          <FlatList
            data={icons}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.iconItem,
                  selectedIcon === item && styles.iconSelected
                ]}
                onPress={() => setSelectedIcon(item)}
              >
                <Ionicons name={item} size={26} color="#333" />
              </TouchableOpacity>
            )}
          />

          {/* Color */}
          <Text style={styles.label}>Color</Text>
          <FlatList
            data={colors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.colorItem,
                  { backgroundColor: item },
                  selectedColor === item && styles.colorSelected
                ]}
                onPress={() => setSelectedColor(item)}
              />
            )}
          />

          {/* Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveBtn]}
              onPress={() => {
                onSave?.({
                  name,
                  icon: selectedIcon,
                  color: selectedColor,
                });
              }}
            >
              <Text style={styles.buttonText}>
                {editMode ? "Save Changes" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  iconItem: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f7f7f7",
  },
  iconSelected: {
    borderColor: "#4A90E2",
    backgroundColor: "#e8f1ff",
  },
  colorItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorSelected: {
    borderColor: "#000",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: "#ccc",
  },
  saveBtn: {
    backgroundColor: "#4A90E2",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
