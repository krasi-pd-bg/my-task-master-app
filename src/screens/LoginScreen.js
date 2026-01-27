// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   ActivityIndicator,
// //   Alert,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';

// // const LoginScreen = ({ navigation }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   // Валидация
// //   const validate = () => {
// //     const newErrors = {};

// //     // Email validation
// //     if (!email) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
// //       newErrors.email = 'Invalid email address';
// //     }

// //     // Password validation
// //     if (!password) {
// //       newErrors.password = 'Password is required';
// //     } else if (password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // Login handler (ще добавим Firebase по-късно)
// //   const handleLogin = async () => {
// //     if (!validate()) return;

// //     setLoading(true);

// //     try {
// //       // TODO: Replace with Firebase authentication
// //       // await signInWithEmailAndPassword(auth, email, password);

// //       // Симулираме API call
// //       setTimeout(() => {
// //         setLoading(false);
// //         Alert.alert('Success', 'Login functionality will be added with Firebase');
// //         // navigation.replace('Main');
// //       }, 1500);
// //     } catch (error) {
// //       setLoading(false);
// //       Alert.alert('Error', error.message || 'Login failed');
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //       style={styles.container}
// //     >
// //       <ScrollView
// //         contentContainerStyle={styles.scrollContent}
// //         keyboardShouldPersistTaps="handled"
// //       >
// //         {/* Header */}
// //         <View style={styles.header}>
// //           <TouchableOpacity
// //             style={styles.backButton}
// //             onPress={() => navigation.goBack()}
// //           >
// //             <Ionicons name="arrow-back" size={24} color="#111827" />
// //           </TouchableOpacity>

// //           <View style={styles.logoContainer}>
// //             <View style={styles.logoCircle}>
// //               <Ionicons name="checkmark-done" size={40} color="#3B82F6" />
// //             </View>
// //           </View>

// //           <Text style={styles.title}>Login</Text>
// //           <Text style={styles.subtitle}>Sign in to continue</Text>
// //         </View>

// //         {/* Form */}
// //         <View style={styles.form}>
// //           {/* Email Input */}
// //           <View style={styles.inputContainer}>
// //             <Text style={styles.label}>Email Address</Text>
// //             <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
// //               <Ionicons name="mail-outline" size={20} color="#6B7280" style={styles.inputIcon} />
// //               <TextInput
// //                 style={styles.input}
// //                 placeholder="Enter your email"
// //                 placeholderTextColor="#9CA3AF"
// //                 value={email}
// //                 onChangeText={(text) => {
// //                   setEmail(text);
// //                   if (errors.email) setErrors({ ...errors, email: null });
// //                 }}
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //                 autoCorrect={false}
// //               />
// //             </View>
// //             {errors.email && (
// //               <Text style={styles.errorText}>{errors.email}</Text>
// //             )}
// //           </View>

// //           {/* Password Input */}
// //           <View style={styles.inputContainer}>
// //             <Text style={styles.label}>Password</Text>
// //             <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
// //               <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
// //               <TextInput
// //                 style={styles.input}
// //                 placeholder="Password"
// //                 placeholderTextColor="#9CA3AF"
// //                 value={password}
// //                 onChangeText={(text) => {
// //                   setPassword(text);
// //                   if (errors.password) setErrors({ ...errors, password: null });
// //                 }}
// //                 secureTextEntry={!showPassword}
// //                 autoCapitalize="none"
// //               />
// //               <TouchableOpacity
// //                 onPress={() => setShowPassword(!showPassword)}
// //                 style={styles.eyeIcon}
// //               >
// //                 <Ionicons
// //                   name={showPassword ? 'eye-outline' : 'eye-off-outline'}
// //                   size={20}
// //                   color="#6B7280"
// //                 />
// //               </TouchableOpacity>
// //             </View>
// //             {errors.password && (
// //               <Text style={styles.errorText}>{errors.password}</Text>
// //             )}
// //           </View>


// //           {/* Login Button */}
// //           <TouchableOpacity
// //             style={[styles.loginButton, loading && styles.loginButtonDisabled]}
// //             onPress={handleLogin}
// //             disabled={loading}
// //             activeOpacity={0.8}
// //           >
// //             {loading ? (
// //               <ActivityIndicator color="#FFFFFF" />
// //             ) : (
// //               <>
// //                 <Text style={styles.loginButtonText}>Login</Text>
// //                 <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
// //               </>
// //             )}
// //           </TouchableOpacity>



// //           {/* Register Link */}
// //           <View style={styles.registerContainer}>
// //             <Text style={styles.registerText}>Don't have an account? </Text>
// //             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
// //               <Text style={styles.registerLink}>Register</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   scrollContent: {
// //     flexGrow: 1,
// //     paddingHorizontal: 24,
// //   },
// //   header: {
// //     paddingTop: 20,
// //     paddingBottom: 32,
// //     alignItems: 'center',
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     left: 0,
// //     top: 20,
// //     padding: 8,
// //   },
// //   logoContainer: {
// //     marginBottom: 24,
// //   },
// //   logoCircle: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 40,
// //     backgroundColor: '#EFF6FF',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#111827',
// //     marginBottom: 8,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#6B7280',
// //   },
// //   form: {
// //     flex: 1,
// //   },
// //   inputContainer: {
// //     marginBottom: 20,
// //   },
// //   label: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     color: '#374151',
// //     marginBottom: 8,
// //   },
// //   inputWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1.5,
// //     borderColor: '#E5E7EB',
// //     borderRadius: 12,
// //     backgroundColor: '#F9FAFB',
// //     paddingHorizontal: 16,
// //   },
// //   inputError: {
// //     borderColor: '#EF4444',
// //   },
// //   inputIcon: {
// //     marginRight: 12,
// //   },
// //   input: {
// //     flex: 1,
// //     paddingVertical: 14,
// //     fontSize: 16,
// //     color: '#111827',
// //   },
// //   eyeIcon: {
// //     padding: 8,
// //   },
// //   errorText: {
// //     fontSize: 13,
// //     color: '#EF4444',
// //     marginTop: 6,
// //     marginLeft: 4,
// //   },
// //   forgotPassword: {
// //     alignSelf: 'flex-end',
// //     marginBottom: 24,
// //   },
// //   forgotPasswordText: {
// //     fontSize: 14,
// //     color: '#3B82F6',
// //     fontWeight: '600',
// //   },
// //   loginButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#3B82F6',
// //     paddingVertical: 16,
// //     borderRadius: 12,
// //     marginBottom: 20,
// //     shadowColor: '#3B82F6',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 4,
// //   },
// //   loginButtonDisabled: {
// //     opacity: 0.6,
// //   },
// //   loginButtonText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#FFFFFF',
// //     marginRight: 8,
// //   },
// //   divider: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 24,
// //   },
// //   dividerLine: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: '#E5E7EB',
// //   },
// //   dividerText: {
// //     marginHorizontal: 16,
// //     fontSize: 14,
// //     color: '#6B7280',
// //     fontWeight: '500',
// //   },
// //   socialButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     borderWidth: 1.5,
// //     borderColor: '#E5E7EB',
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     marginBottom: 24,
// //     backgroundColor: '#FFFFFF',
// //   },
// //   socialButtonText: {
// //     fontSize: 15,
// //     fontWeight: '600',
// //     color: '#374151',
// //     marginLeft: 12,
// //   },
// //   registerContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingVertical: 20,
// //   },
// //   registerText: {
// //     fontSize: 15,
// //     color: '#6B7280',
// //   },
// //   registerLink: {
// //     fontSize: 15,
// //     fontWeight: 'bold',
// //     color: '#3B82F6',
// //   },
// // });

// // export default LoginScreen; 

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Back Button */}
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>

//         {/* Header */}
//         <View style={styles.header}>
//           <Ionicons name="checkmark-done-circle" size={70} color="#4A90E2" />
//           <Text style={styles.title}>Welcome Back</Text>
//           <Text style={styles.subtitle}>Login to your account</Text>
//         </View>

//         {/* Email */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email</Text>
//           <View style={styles.inputWrapper}>
//             <Ionicons
//               name="mail-outline"
//               size={20}
//               color="#777"
//               style={styles.inputIcon}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               placeholderTextColor="#999"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         {/* Password */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <View style={styles.inputWrapper}>
//             <Ionicons
//               name="lock-closed-outline"
//               size={20}
//               color="#777"
//               style={styles.inputIcon}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               placeholderTextColor="#999"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.eyeIcon}
//             >
//               <Ionicons
//                 name={showPassword ? "eye-outline" : "eye-off-outline"}
//                 size={20}
//                 color="#777"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity style={styles.loginButton}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>

//         {/* Register Link */}
//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>Don't have an account</Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//             <Text style={styles.registerLink}> Register</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },

//   backButton: {
//     padding: 6,
//     marginBottom: 10,
//   },

//   header: {
//     alignItems: "center",
//     marginBottom: 30,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#333",
//     marginTop: 10,
//   },

//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },

//   inputContainer: {
//     marginBottom: 20,
//   },

//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 6,
//   },

//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     backgroundColor: "#f9f9f9",
//     paddingHorizontal: 12,
//   },

//   inputIcon: {
//     marginRight: 10,
//   },

//   input: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: "#333",
//   },

//   eyeIcon: {
//     padding: 6,
//   },

//   loginButton: {
//     backgroundColor: "#4A90E2",
//     paddingVertical: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },

//   loginButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   registerContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 25,
//   },

//   registerText: {
//     fontSize: 15,
//     color: "#666",
//   },

//   registerLink: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#4A90E2",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid={true}
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="checkmark-done-circle" size={70} color="#4A90E2" />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#777"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#777"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}> Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    padding: 6,
    marginBottom: 10,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 12,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },

  eyeIcon: {
    padding: 6,
  },

  loginButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  registerText: {
    fontSize: 15,
    color: "#666",
  },

  registerLink: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4A90E2",
  },
});
