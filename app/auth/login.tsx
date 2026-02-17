import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Validate credentials against registered users
        const success = await login(email, password);

        if (success) {
            // Navigate to main app
            router.replace('/(tabs)');
        } else {
            Alert.alert('Login Failed', 'Invalid email or password. Please register if you don\'t have an account.');
        }
    };

    const handleBackToLanding = () => {
        router.back();
    };

    const handleGoToRegister = () => {
        router.push('/auth/register');
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
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackToLanding}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="leaf" size={50} color="#FFFFFF" />
                    </View>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to your account</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
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

                    {/* Password Input */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoComplete="password"
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

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleGoToRegister}>
                            <Text style={styles.registerLink}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Or Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                {/* Social Login */}
                <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-google" size={20} color="#0F4C2C" />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>
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
        marginBottom: 40,
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
        marginBottom: 30,
    },
    inputWrapper: {
        marginBottom: 20,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 25,
    },
    forgotPasswordText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
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
        marginBottom: 20,
    },
    buttonText: {
        color: '#0F4C2C',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    registerLink: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    dividerText: {
        color: 'rgba(255, 255, 255, 0.6)',
        paddingHorizontal: 15,
        fontSize: 14,
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    socialButtonText: {
        color: '#0F4C2C',
        fontSize: 16,
        fontWeight: '600',
    },
});
