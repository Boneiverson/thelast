import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Noble,</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subText}>Grow with a loan today.</Text>

      {/* No Active Loans */}
      <View style={styles.cardGreen}>
        <Text style={styles.cardTitle}>No Active Loans</Text>
        <Text style={styles.cardText}>You currently have no unpaid loans.</Text>
        <TouchableOpacity style={styles.buttonGreen} onPress={() => router.push('/request') }>
          <Text style={styles.buttonText}>Apply for a Loan</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Take a Loan */}
      <View style={styles.cardWhite}>
        <Text style={styles.cardTitle}>Take a loan</Text>
        <Text style={styles.cardText}>Request for a quick loan and get it into your bank account.</Text>
        <TouchableOpacity style={styles.buttonGreen} onPress={() => router.push('/request') }>
          <Text style={styles.buttonText}>Request</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Loan History */}
      <View style={styles.loanHistoryHeader}>
        <Text style={styles.sectionTitle}>Loan History</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardWhite}>
        <Text style={styles.cardText}>No loan history available yet.</Text>
        <TouchableOpacity>
          <Text style={styles.applyText}>Apply for your first loan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F5F9FF', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#0A8754' },
  subText: { fontSize: 14, color: '#666' },
  notificationIcon: { padding: 8, borderRadius: 20, backgroundColor: 'white', elevation: 2 },
  cardGreen: { backgroundColor: '#DFFFE1', padding: 20, borderRadius: 10, marginTop: 20 },
  cardWhite: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 20, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  cardText: { fontSize: 14, color: '#666', marginBottom: 10 },
  buttonGreen: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A8754', padding: 10, borderRadius: 5, justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', marginRight: 5 },
  loanHistoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  viewAllText: { fontSize: 14, color: '#0A8754', fontWeight: 'bold' },
  applyText: { fontSize: 14, color: '#0A8754', fontWeight: 'bold', marginTop: 10 }
});

export default Dashboard;
