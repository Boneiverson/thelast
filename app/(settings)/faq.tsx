import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text, List } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "expo-router"; // Import useNavigation from expo-router

const { width, height } = Dimensions.get("window");

const FAQScreen = () => {
  const navigation = useNavigation();

  // Hide the header
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const faqs = [
    { id: 1, question: "How do I apply for a loan?", answer: "Go to the Loans section and follow the steps." },
    { id: 2, question: "How do I repay my loan?", answer: "Use the Payment Methods section to make a payment." },
  ];

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {faqs.map((faq) => (
          <List.Item
            key={faq.id}
            title={faq.question}
            description={faq.answer}
            left={() => <List.Icon icon="help-circle" />}
            style={styles.listItem}
          />
        ))}
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
  listItem: {
    marginBottom: height * 0.01,
  },
};

export default FAQScreen;