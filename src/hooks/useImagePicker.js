import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Споделена логика за избор на профилна снимка (галерия или камера),
// ползвана от RegisterScreen и ProfileScreen. Двата екрана се различават
// в това какво правят с избраната снимка (Register я държи локално до
// submit, Profile я качва веднага) — затова хукът само избира снимката
// и подава URI-то на onPicked; какво се случва след това е решение на
// извикващия екран.
export function useImagePicker({ onPicked, galleryQuality = 0.6, cameraQuality = 0.6 } = {}) {
    const pickImageFromGallery = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert(
                    'Permission Required',
                    'Please allow access to your photos to select a profile picture.',
                    [{ text: 'OK' }]
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: galleryQuality,
            });

            if (!result.canceled) {
                await onPicked?.(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const takePhoto = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert(
                    'Permission Required',
                    'Please allow access to your camera to take a profile picture.',
                    [{ text: 'OK' }]
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: cameraQuality,
            });

            if (!result.canceled) {
                await onPicked?.(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const showImageOptions = () => {
        Alert.alert('Update Profile Picture', 'Choose an option', [
            { text: 'Take Photo', onPress: takePhoto },
            { text: 'Choose from Gallery', onPress: pickImageFromGallery },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    return { pickImageFromGallery, takePhoto, showImageOptions };
}
