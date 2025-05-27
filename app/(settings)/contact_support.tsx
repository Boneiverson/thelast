import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "expo-router"; // Import useNavigation from expo-router

const { width, height } = Dimensions.get("window");

const ContactSupportScreen = () => {
  const [message, setMessage] = useState("");

  const navigation = useNavigation();

  // Hide the header
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSend = () => {
    console.log("Message sent:", message);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TextInput
          label="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
          style={styles.input}
        />
        <SendButton mode="contained" onPress={handleSend}>
          Send Message
        </SendButton>
      </ScrollView>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: ${width * 0.05}px;
`;

const SendButton = styled(Button)`
  margin-top: ${height * 0.03}px;
  background-color: #007bff;
`;

const styles = {
  input: {
    marginBottom: height * 0.02,
    backgroundColor: "#fff",
  },
};

export default ContactSupportScreen;