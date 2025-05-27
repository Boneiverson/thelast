import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "expo-router"; // Import useNavigation from expo-router

const { width, height } = Dimensions.get("window");

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  // Hide the header
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </ScrollView>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: ${width * 0.05}px;
`;

const styles = {
  text: {
    fontSize: width * 0.04,
  },
};

export default PrivacyPolicyScreen;