import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Споделен label + icon + TextInput ред, ползван от Login/Register екраните.
// secureToggle=true добавя eye/eye-off бутон за показване/скриване на паролата.
// Всеки друг TextInput проп (value, onChangeText, keyboardType, returnKeyType,
// onSubmitEditing и т.н.) минава директно през ...inputProps.
const FormInput = forwardRef(function FormInput(
    { label, icon, secureToggle = false, editable = true, ...inputProps },
    ref
) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <Ionicons name={icon} size={20} color="#777" style={styles.inputIcon} />
                <TextInput
                    ref={ref}
                    style={styles.input}
                    placeholderTextColor="#999"
                    editable={editable}
                    secureTextEntry={secureToggle ? !visible : undefined}
                    {...inputProps}
                />
                {secureToggle && (
                    <TouchableOpacity
                        onPress={() => setVisible((v) => !v)}
                        style={styles.eyeIcon}
                        disabled={!editable}
                    >
                        <Ionicons
                            name={visible ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color="#777"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

export default FormInput;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 6,
    },
});
