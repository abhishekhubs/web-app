import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        // Register user with AuthContext
        const success = await register({ fullName, email, phone, password });

        if (success) {
            Alert.alert('Success', 'Account created successfully!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/(tabs)'),
                }
            ]);
        } else {
            Alert.alert('Registration Failed', 'This email is already registered. Please use a different email or login.');
        }
    };

    const handleBackToLogin = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar style="light" />

            {/* Background Gradient */}
            <LinearGradient
                colors={['#0F4C2C', '#1A5D3A', '#2C7A4F']}
                style={styles.gradient}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackToLogin}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="person-add" size={50} color="#FFFFFF" />
                    </View>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join us and start investing</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    {/* Full Name Input */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Create a password"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="rgba(255, 255, 255, 0.7)"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="rgba(255, 255, 255, 0.7)"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={handleBackToLogin}>
                            <Text style={styles.loginLink}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Terms */}
                <Text style={styles.termsText}>
                    By creating an account, you agree to our{'\n'}
                    <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 8,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        paddingVertical: 15,
    },
    eyeIcon: {
        padding: 5,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#0F4C2C',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    loginLink: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    termsText: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        lineHeight: 18,
    },
    termsLink: {
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});
