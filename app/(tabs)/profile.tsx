import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SettingsScreen = () => {
  const router = useRouter();

  // Simple fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400, // 400ms fade in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogout = () => {
    console.log('User logged out');
    router.push('/(auth)/sign-in');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          {/* Profile Icon (Avatar) */}
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>N</Text>
          </View>
        </View>

        {/* Loan Management Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Loan Management</Text>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push('/current_loans')}
          >
            <Ionicons
              name="briefcase-outline"
              size={24}
              color="#0A8754"
              style={styles.listItemIcon}
            />
            <Text style={styles.listItemText}>Current Loans</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push('/loan_history')}
          >
            <Ionicons
              name="time-outline"
              size={24}
              color="#0A8754"
              style={styles.listItemIcon}
            />
            <Text style={styles.listItemText}>Loan History</Text>
          </TouchableOpacity>
        </View>

        {/* Help & Support Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Help & Support</Text>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push('/faq')}
          >
            <Ionicons
              name="help-circle-outline"
              size={24}
              color="#0A8754"
              style={styles.listItemIcon}
            />
            <Text style={styles.listItemText}>FAQ</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push('/contact_support')}
          >
            <Ionicons
              name="call-outline"
              size={24}
              color="#0A8754"
              style={styles.listItemIcon}
            />
            <Text style={styles.listItemText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Legal Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Legal Information</Text>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push('/terms_of_service')}
          >
            <Ionicons
              name="document-outline"
              size={24}
              color="#0A8754"
              style={styles.listItemIcon}
            />
            <Text style={styles.listItemText}>Terms of Service</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => router.push('/privacy_policy')}
          >
            <Ionicons
              name="shield-outline"
              size={24}
              color="#0A8754"
              style={styles.listItemIcon}
            />
            <Text style={styles.listItemText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: width * 0.05, // 5% horizontal padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  backButton: {
    marginRight: width * 0.02,
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#0A8754',
  },
  avatarContainer: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    backgroundColor: '#0A8754',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  phoneNumber: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.02,
  },
  card: {
    backgroundColor: '#FFF',
    padding: width * 0.05,
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
    elevation: 2,
  },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.01,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.01,
  },
  listItemIcon: {
    marginRight: width * 0.04,
  },
  listItemText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: height * 0.01,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.015,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default SettingsScreen;
