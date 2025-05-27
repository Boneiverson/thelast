import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LoanHistory = () => {
  const router = useRouter();

  const navigation = useNavigation();
  
    // Hide the header
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

  // State to track which tab is active
  const [activeTab, setActiveTab] = useState('All');

  // Simple fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400, // 400ms fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBack = () => {
    router.back();
  };

  const handleTabPress = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
    // TODO: Filter or fetch data based on the tab (All, Active, Completed)
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Loan History</Text>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>N</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Page Title & Subtitle */}
        <Text style={styles.pageTitle}>Your Loans</Text>
        <Text style={styles.subTitle}>View all your loan transactions</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'All' && styles.activeTab,
            ]}
            onPress={() => handleTabPress('All')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'All' && styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Active' && styles.activeTab,
            ]}
            onPress={() => handleTabPress('Active')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Active' && styles.activeTabText,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Completed' && styles.activeTab,
            ]}
            onPress={() => handleTabPress('Completed')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Completed' && styles.activeTabText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* No History Card */}
        <View style={styles.card}>
          <Text style={styles.noHistoryText}>You have no loan history yet.</Text>

          {/* Centered Apply Button */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => router.push('/request')}>
              <Text style={styles.applyText}>Apply for a loan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default LoanHistory;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    paddingHorizontal: width * 0.05, // 5% horizontal padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  backButton: {
    paddingRight: width * 0.02,
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
  pageTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#0A8754',
    marginBottom: height * 0.01,
  },
  subTitle: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.02,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
  },
  tabButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    backgroundColor: '#FFF',
    borderRadius: width * 0.03,
    marginRight: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // subtle shadow
  },
  activeTab: {
    backgroundColor: '#0A8754',
  },
  tabText: {
    fontSize: width * 0.035,
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    padding: width * 0.05,
    borderRadius: width * 0.03,
    elevation: 2,
    marginBottom: height * 0.02,
  },
  noHistoryText: {
    fontSize: width * 0.04,
    color: '#333',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  applyText: {
    fontSize: width * 0.04,
    color: '#0A8754',
    fontWeight: 'bold',
  },
});
