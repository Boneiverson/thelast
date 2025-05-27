import { Image, ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { images } from '@/constants';
import Custombutton from "../components/Custombutton";
import { Redirect, useRouter } from 'expo-router'; // Import router and Redirect
import React from "react";

export default function Index() {
  const router = useRouter(); // Initialize router for navigation

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={images.logo} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        {/* Illustration Section */}
        <View style={styles.cardsContainer}>
          <Image 
            source={images.cards} 
            style={styles.cards} 
            resizeMode="contain"
          />
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Get Started</Text>
          <Text style={styles.subText}>
            Explore loan options and apply quickly.
          </Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <Custombutton />
        </View>
      </ScrollView>

      {/* Redirect Example: Automatically send users to sign-in */}
      {/* Uncomment this line if you want an automatic redirect */}
      {/* <Redirect href="/sign-in" /> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: -10,
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 220,
    height: 150,
  },
  cardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  cards: {
    width: 850,
    height: 0,
    alignContent: "center",
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: -50,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
});
