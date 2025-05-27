import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text, List } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "expo-router"; // Import useNavigation from expo-router

const { width, height } = Dimensions.get("window");

const CurrentLoansScreen = () => {
  const navigation = useNavigation();

  // Hide the header
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const loans = [
    { id: 1, amount: "$5,000", status: "Active", dueDate: "2023-11-15" },
    { id: 2, amount: "$2,500", status: "Pending Approval", dueDate: "N/A" },
  ];

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {loans.map((loan) => (
          <List.Item
            key={loan.id}
            title={`Loan Amount: ${loan.amount}`}
            description={`Status: ${loan.status} | Due Date: ${loan.dueDate}`}
            left={() => <List.Icon icon="cash" />}
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

export default CurrentLoansScreen;