import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [showFarmhandJobs, setShowFarmhandJobs] = useState(true);
    const [showFarmownerJobs, setShowFarmownerJobs] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Green Gradient Header */}
            <LinearGradient
                colors={['#0F4C2C', '#1A5D3A', '#2C7A4F']}
                style={styles.gradientHeader}
            >
                <SafeAreaView edges={['top']}>
                    <Text style={styles.headerTitle}>My Profile</Text>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Profile Identity Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatar}>👨‍🌾</Text>
                    </View>
                    <Text style={styles.name}>Abhishek Shrivastav</Text>
                    <Text style={styles.userId}>📞*******908</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={18} color="#d6d0b1ff" />
                        <Text style={styles.rating}>0</Text>
                    </View>
                </View>

                {/* Profile Details Navigation */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile Details</Text>
                    <View style={styles.detailsGrid}>
                        <ProfileDetailItem icon="person" label="User" />
                        <ProfileDetailItem icon="book" label="Education" />
                        <ProfileDetailItem icon="leaf" label="Farm Details" />
                        <ProfileDetailItem icon="camera" label="Farm Images" />
                    </View>
                </View>

                {/* Farmhand Jobs Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>👨‍🌾 Farmhand Jobs</Text>
                        <TouchableOpacity onPress={() => setShowFarmhandJobs(!showFarmhandJobs)}>
                            <Text style={styles.toggleText}>
                                {showFarmhandJobs ? 'HIDE' : 'SHOW'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showFarmhandJobs && (
                        <View style={styles.jobsGrid}>
                            <JobStatusCard icon="mail" label="Applied" count={2} />
                            <JobStatusCard icon="time" label="Scheduled" count={0} highlighted />
                            <JobStatusCard icon="refresh" label="Received" count={3} />
                            <JobStatusCard icon="heart" label="Favorite" count={6} />
                            <JobStatusCard icon="checkmark-circle" label="Completed" count={12} />
                        </View>
                    )}
                </View>

                {/* Farmowner Jobs Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🚜 Farmowner Jobs</Text>
                        <TouchableOpacity onPress={() => setShowFarmownerJobs(!showFarmownerJobs)}>
                            <Text style={styles.toggleText}>
                                {showFarmownerJobs ? 'HIDE' : 'SHOW'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showFarmownerJobs && (
                        <View style={styles.jobsGrid}>
                            <JobStatusCard icon="document-text" label="Posted" count={0} />
                            <JobStatusCard icon="arrow-back-circle" label="Past" count={3} />
                            <JobStatusCard icon="megaphone" label="Request" count={0} />
                        </View>
                    )}
                </View>

                {/* Settings Menu */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <MenuOption icon="settings" label="Account Settings" />
                    <MenuOption icon="wallet" label="My Investments" />
                    <MenuOption icon="notifications" label="Notifications" />
                    <MenuOption icon="help-circle" label="Help & Support" />
                    <MenuOption icon="log-out" label="Logout" danger />
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>
        </View>
    );
}

const ProfileDetailItem = ({ icon, label }: { icon: any; label: string }) => (
    <TouchableOpacity style={styles.detailItem}>
        <View style={styles.detailIconContainer}>
            <Ionicons name={icon} size={24} color="#2ECC71" />
        </View>
        <Text style={styles.detailLabel}>{label}</Text>
    </TouchableOpacity>
);

const JobStatusCard = ({
    icon,
    label,
    count,
    highlighted = false
}: {
    icon: any;
    label: string;
    count: number;
    highlighted?: boolean;
}) => (
    <View style={[
        styles.jobCard,
        highlighted && styles.jobCardHighlighted
    ]}>
        <Ionicons
            name={icon}
            size={28}
            color={highlighted ? '#FFFFFF' : '#2ECC71'}
        />
        <Text style={[
            styles.jobLabel,
            highlighted && styles.jobLabelHighlighted
        ]}>
            {label}
        </Text>
        <Text style={[
            styles.jobCount,
            highlighted && styles.jobCountHighlighted
        ]}>
            {count}
        </Text>
    </View>
);

const MenuOption = ({
    icon,
    label,
    danger = false
}: {
    icon: any;
    label: string;
    danger?: boolean;
}) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
            <Ionicons
                name={icon}
                size={22}
                color={danger ? '#E74C3C' : '#666'}
            />
            <Text style={[
                styles.menuLabel,
                danger && styles.menuLabelDanger
            ]}>
                {label}
            </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    gradientHeader: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 10,
    },
    scrollView: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -20,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#F0F8FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#2ECC71',
        marginBottom: 15,
    },
    avatar: {
        fontSize: 48,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userId: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#FFF9E6',
        borderRadius: 15,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    toggleText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2ECC71',
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    detailItem: {
        width: '22%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    detailIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
    },
    jobsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    jobCard: {
        width: '30%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    jobCardHighlighted: {
        backgroundColor: '#1A5D3A',
    },
    jobLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    jobLabelHighlighted: {
        color: '#FFFFFF',
    },
    jobCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2ECC71',
        marginTop: 4,
    },
    jobCountHighlighted: {
        color: '#FFFFFF',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    menuLabel: {
        fontSize: 15,
        color: '#333',
    },
    menuLabelDanger: {
        color: '#E74C3C',
    },
});
