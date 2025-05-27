import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Platform, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as Contacts from 'expo-contacts';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; // For image upload

const { width, height } = Dimensions.get('window');

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  // Hide the header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // State for Personal Details
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [employmentStatus, setEmploymentStatus] = useState('Employed');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [idImage, setIdImage] = useState<string | null>(null); // For ID image upload

  // State for Guarantor Details
  const [guarantors, setGuarantors] = useState([{ name: '', contact: '' }]);

  // State for Account Details
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [walletProvider, setWalletProvider] = useState('');

  // Progress bar steps
  const steps = ['Personal Details', 'Guarantor Details', 'Account Details'];

  // Handle Next Step
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  // Handle Previous Step
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Pick Contact for Guarantor
  const pickContact = async (index: number) => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] });
      if (data.length > 0) {
        const contact = await Contacts.presentFormAsync(data[0].id);
        if (contact) {
          const updatedGuarantors = [...guarantors];
          updatedGuarantors[index] = {
            name: contact.name,
            contact: contact.phoneNumbers?.[0]?.number || '',
          };
          setGuarantors(updatedGuarantors);
        }
      }
    }
  };

  // Add Guarantor
  const addGuarantor = () => {
    setGuarantors([...guarantors, { name: '', contact: '' }]);
  };

  // Remove Guarantor
  const removeGuarantor = (index: number) => {
    const updatedGuarantors = guarantors.filter((_, i) => i !== index);
    setGuarantors(updatedGuarantors);
  };

  // Upload ID Image
  const uploadIDImage = async (source: 'gallery' | 'camera') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result;
    if (source === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (result && !result.canceled) {
      if (!result.canceled) {
        setIdImage(result.assets[0].uri);
      }
    }
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.label}>Middle Name (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your middle name (optional)"
              value={middleName}
              onChangeText={setMiddleName}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />

            {/* Gender Radio Buttons */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setGender('Male')}
              >
                <View style={styles.radioCircle}>
                  {gender === 'Male' && <View style={styles.selectedRadioCircle} />}
                </View>
                <Text style={styles.radioLabel}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setGender('Female')}
              >
                <View style={styles.radioCircle}>
                  {gender === 'Female' && <View style={styles.selectedRadioCircle} />}
                </View>
                <Text style={styles.radioLabel}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setGender('Other')}
              >
                <View style={styles.radioCircle}>
                  {gender === 'Other' && <View style={styles.selectedRadioCircle} />}
                </View>
                <Text style={styles.radioLabel}>Other</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Marital Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={maritalStatus}
                onValueChange={setMaritalStatus}
                style={[styles.picker, { fontSize: 12 }]} // Font size changed to 12
              >
                <Picker.Item label="Single" value="Single" />
                <Picker.Item label="Married" value="Married" />
                <Picker.Item label="Divorced" value="Divorced" />
                <Picker.Item label="Widowed" value="Widowed" />
              </Picker>
            </View>
            <Text style={styles.label}>Employment Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={employmentStatus}
                onValueChange={setEmploymentStatus}
                style={[styles.picker, { fontSize: 12 }]} // Font size changed to 12
              >
                <Picker.Item label="Employed" value="Employed" />
                <Picker.Item label="Self-Employed" value="Self-Employed" />
                <Picker.Item label="Unemployed" value="Unemployed" />
                <Picker.Item label="Student" value="Student" />
              </Picker>
            </View>

            {/* ID Image Upload */}
            <Text style={styles.label}>Upload ID Image</Text>
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => uploadIDImage('gallery')}
              >
                <Text style={styles.buttonText}>Upload from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => uploadIDImage('camera')}
              >
                <Text style={styles.buttonText}>Capture from Camera</Text>
              </TouchableOpacity>
            </View>
            {idImage && (
              <Image source={{ uri: idImage }} style={styles.idImage} />
            )}
          </>
        );
      case 2:
        return (
          <>
            {guarantors.map((guarantor, index) => (
              <View key={index} style={styles.guarantorContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  value={guarantor.name}
                  onChangeText={(text) => {
                    const updatedGuarantors = [...guarantors];
                    updatedGuarantors[index].name = text;
                    setGuarantors(updatedGuarantors);
                  }}
                />
                <Text style={styles.label}>Contact</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter contact number"
                  value={guarantor.contact}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    const updatedGuarantors = [...guarantors];
                    updatedGuarantors[index].contact = text;
                    setGuarantors(updatedGuarantors);
                  }}
                />
                <TouchableOpacity
                  style={styles.pickContactButton} // Resized to match Next/Previous buttons
                  onPress={() => pickContact(index)}
                >
                  <Text style={styles.buttonText}>Pick from Contacts</Text>
                </TouchableOpacity>

                {guarantors.length > 1 && (
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeGuarantor(index)}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addGuarantor}>
              <Text style={styles.buttonText}>Add Another Guarantor</Text>
            </TouchableOpacity>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.label}>Mobile Money Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile money number"
              keyboardType="phone-pad"
              value={mobileMoneyNumber}
              onChangeText={setMobileMoneyNumber}
            />
            <Text style={styles.label}>Holder's Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the account holder's name"
              value={holderName}
              onChangeText={setHolderName}
            />
            <Text style={styles.label}>Mobile Wallet Provider</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={walletProvider}
                onValueChange={setWalletProvider}
                style={[styles.picker, { fontSize: 12 }]} // Font size changed to 12
              >
                <Picker.Item label="Select provider" value="" />
                <Picker.Item label="MTN Mobile Money" value="MTN" />
                <Picker.Item label="Vodafone Cash" value="Vodafone" />
                <Picker.Item label="AirtelTigo Money" value="AirtelTigo" />
              </Picker>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          {steps.map((stepTitle, index) => (
            <View key={index} style={styles.progressStep}>
              <View
                style={[
                  styles.progressCircle,
                  step > index && styles.progressCircleCompleted,
                ]}
              >
                <Text style={styles.progressCircleText}>{index + 1}</Text>
              </View>
              <Text style={styles.progressStepText}>{stepTitle}</Text>
            </View>
          ))}
        </View>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>{step === 3 ? 'Finish' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05, // 5% of screen width
  },
  card: {
    width: width * 0.9, // 90% of screen width
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressCircle: {
    width: width * 0.08, // 8% of screen width
    height: width * 0.08, // 8% of screen width
    borderRadius: width * 0.04, // 4% of screen width
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleCompleted: {
    backgroundColor: '#0A8754', // Green color
  },
  progressCircleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressStepText: {
    marginTop: 5,
    fontSize: width * 0.03, // 3% of screen width
    textAlign: 'center',
  },
  label: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    height: height * 0.06, // 6% of screen height
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    height: height * 0.06, // 6% of screen height
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: height * 0.06, // 6% of screen height
  },
  guarantorContainer: {
    marginBottom: 20,
  },
  pickContactButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    width: width * 0.4, // Same width as Next/Previous buttons
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#0A8754',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previousButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#0A8754',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: width * 0.05, // 5% of screen width
    height: width * 0.05, // 5% of screen width
    borderRadius: width * 0.025, // 2.5% of screen width
    borderWidth: 2,
    borderColor: '#28a745', // Green color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedRadioCircle: {
    width: width * 0.03, // 3% of screen width
    height: width * 0.03, // 3% of screen width
    borderRadius: width * 0.015, // 1.5% of screen width
    backgroundColor: '#28a745', // Green color
  },
  radioLabel: {
    fontSize: width * 0.04, // 4% of screen width
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#0A8754',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  idImage: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.2, // 20% of screen height
    borderRadius: 10,
    marginTop: 10,
  },
});

export default MultiStepForm;