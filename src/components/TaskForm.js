import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../constants/theme';

// Споделена форма за създаване/редактиране на задача.
// `form` е обектът, върнат от useTaskForm(). showStatusToggle показва
// "Completed / Not completed" реда отгоре - само EditTaskScreen го подава,
// защото Create няма такова поле.
export default function TaskForm({
    form,
    heading,
    submitLabel,
    onSubmit,
    loading = false,
    showStatusToggle = false,
}) {
    const {
        title, setTitle,
        category,
        description, setDescription,
        taskDate,
        taskTime,
        completed,
        categories,
        isPickerOpen,
        showDatePicker,
        showTimePicker,
        openPicker, closePicker, selectCategory,
        openDatePicker, openTimePicker,
        dismissDatePicker, dismissTimePicker,
        handleDateChange, handleTimeChange,
        toggleCompleted,
    } = form;

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                enableOnAndroid={true}
                extraScrollHeight={40}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.heading}>{heading}</Text>

                {showStatusToggle && (
                    <>
                        <Text style={styles.label}>Status</Text>
                        <TouchableOpacity style={styles.statusBox} onPress={toggleCompleted}>
                            {completed ? (
                                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                            ) : (
                                <Ionicons name="ellipse-outline" size={24} color="#999" />
                            )}
                            <Text style={styles.statusText}>
                                {completed ? 'Completed' : 'Not completed'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder="Enter task title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Category</Text>
                <TouchableOpacity style={styles.selector} onPress={openPicker}>
                    <View style={styles.selectorRow}>
                        <Ionicons
                            name={category?.icon || 'pricetag-outline'}
                            size={18}
                            color={category?.color || '#777'}
                            style={styles.selectorIcon}
                        />
                        <Text style={[styles.selectorText, { color: category?.color || '#555' }]}>
                            {category?.name || 'Select Category'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <Modal visible={isPickerOpen} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>Choose Category</Text>

                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => selectCategory(item)}
                                    >
                                        <View style={styles.selectorRow}>
                                            <Ionicons
                                                name={item.icon}
                                                size={18}
                                                color={item.color}
                                                style={styles.selectorIcon}
                                            />
                                            <Text style={[styles.modalItemText, { color: item.color }]}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                            <TouchableOpacity style={styles.modalCancel} onPress={closePicker}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Text style={styles.label}>Description</Text>
                <TextInput
                    placeholder="Describe your task..."
                    style={[styles.input, styles.textArea]}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />

                <Text style={styles.label}>Task Date</Text>
                <TouchableOpacity style={styles.selector} onPress={openDatePicker}>
                    <Text style={styles.selectorText}>
                        {taskDate ? taskDate.toLocaleDateString() : 'Select Date'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Task Time</Text>
                <TouchableOpacity style={styles.selector} onPress={openTimePicker}>
                    <Text style={styles.selectorText}>
                        {taskTime
                            ? taskTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Select Time'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>{submitLabel}</Text>
                    )}
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            {showDatePicker && (
                <DateTimePicker
                    value={taskDate || new Date()}
                    mode="date"
                    display="default"
                    onValueChange={handleDateChange}
                    onDismiss={dismissDatePicker}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={taskTime || new Date()}
                    mode="time"
                    display="default"
                    onValueChange={handleTimeChange}
                    onDismiss={dismissTimePicker}
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
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.divider,
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
        borderColor: COLORS.border,
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
    selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorIcon: {
        marginRight: 6,
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
        backgroundColor: COLORS.divider,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCancelText: {
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        backgroundColor: COLORS.primary,
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
