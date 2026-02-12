import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddCategoryModal from '../components/AddCategoryModal';
import { categoryService } from '../services/index';
import { useUserContext } from '../contexts/user/UserContext';

export default function CategoriesScreen() {
  const { user } = useUserContext();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Заредени категориите при mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Заредени категориите от API
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getByUserId(user.id);
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // ADD CATEGORY (API call)
  const handleSaveCategory = async (newCat) => {
    try {
      const createdCategory = await categoryService.create({
        name: newCat.name,
        icon: newCat.icon,
        color: newCat.color,
        userId: user.id,
      });

      setCategories((prev) => [...prev, createdCategory]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
      Alert.alert('Error', 'Failed to create category');
    }
  };

  // DELETE CATEGORY (API call)
  const handleDeleteCategory = async () => {
    try {
      await categoryService.remove(selectedCategory.id);
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
      setIsActionModalOpen(false);
    } catch (error) {
      console.error('Error deleting category:', error);
      Alert.alert('Error', 'Failed to delete category');
    }
  };

  // EDIT CATEGORY (UI only)
  const handleEditCategory = () => {
    setIsActionModalOpen(false);
    setIsEditModalOpen(true);
  };

  // SAVE EDITED CATEGORY (API call)
  const handleSaveEditedCategory = async (updatedCat) => {
    try {
      const updated = await categoryService.update(selectedCategory.id, {
        name: updatedCat.name,
        icon: updatedCat.icon,
        color: updatedCat.color,
        userId: user.id,
      });

      setCategories((prev) =>
        prev.map((c) => (c.id === selectedCategory.id ? updated : c))
      );

      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating category:', error);
      Alert.alert('Error', 'Failed to update category');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Зареждам категориите...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Categories</Text>
          <Text style={styles.hintText}>Long press for more ...</Text>

          {categories.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>Нямаш категории</Text>
              <Text style={styles.emptySubtext}>Натисни + за да добавиш нова</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.card}
                  onLongPress={() => {
                    setSelectedCategory(cat);
                    setIsActionModalOpen(true);
                  }}
                >
                  <View style={[styles.iconWrapper, { backgroundColor: cat.color }]}>
                    <Ionicons name={cat.icon} size={26} color="#fff" />
                  </View>
                  <Text style={styles.cardText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddModalOpen(true)}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Add Category Modal */}
      <AddCategoryModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCategory}
        editMode={false}
      />

      {/* Edit Category Modal */}
      <AddCategoryModal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedCategory}
        editMode={true}
        initialData={selectedCategory}
      />

      {/* Action Modal (Edit / Delete) */}
      <Modal visible={isActionModalOpen} transparent animationType="fade">
        <View style={styles.actionOverlay}>
          <View style={styles.actionBox}>
            <Text style={styles.actionTitle}>{selectedCategory?.name}</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={handleEditCategory}>
              <Ionicons name="create-outline" size={22} color="#4A90E2" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleDeleteCategory}>
              <Ionicons name="trash-outline" size={22} color="#E24A4A" />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { marginTop: 10 }]}
              onPress={() => setIsActionModalOpen(false)}
            >
              <Text style={[styles.actionText, { color: "#555" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    flexGrow: 1,
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },

  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 5,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },

  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#4A90E2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  /* Action Modal */
  actionOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBox: {
    width: "75%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  actionBtn: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
    color: "#333",
  },
  hintText: {
    paddingLeft: 20,
    textAlign: 'left',
    fontSize: 13,
    color: '#777',
    marginTop: 10,
    marginBottom: 20,
  },

});