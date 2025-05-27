import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';

const PaymentPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');


  const [network, setNetwork] = useState('MTN'); // Default network

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handlePayment = () => {
    // Handle mobile money payment logic here
    console.log('Payment processed via', network, 'with number', mobileNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Loan Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Outstanding Balance</Text>
        <Text style={styles.cardAmount}>GH₵ 500.00</Text>
        <Text style={styles.cardDueDate}>Due Date: 10/31/2023</Text>
      </View>

      {/* Mobile Money Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Select Network</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={network}
            style={styles.picker}
            onValueChange={(itemValue: React.SetStateAction<string>) => setNetwork(itemValue)}
          >
            <Picker.Item label="MTN" value="MTN" />
            <Picker.Item label="Vodafone" value="Vodafone" />
            <Picker.Item label="AirtelTigo" value="AirtelTigo" />
          </Picker>
        </View>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  cardDueDate: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  payButton: {
    backgroundColor: '#0A8754',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  security: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  lockIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  securityText: {
    fontSize: 14,
    color: '#666',
  },
});

export default PaymentPage;