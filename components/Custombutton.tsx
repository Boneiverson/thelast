import { TouchableOpacity, Text, Animated } from 'react-native';
import React, { useRef } from 'react';
import { useRouter } from 'expo-router'; // Use expo-router for navigation

const Custombutton = () => {
  const router = useRouter(); // Initialize router for navigation

  // Animation scale value
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    console.log('Navigating to SignIn...');
    router.push('/sign-in'); // Use expo-router navigation
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress} // Trigger navigation
      style={{
        backgroundColor: '#00FF00',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          REQUEST A LOAN
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Custombutton;
