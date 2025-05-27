import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; 
import { icons } from '../../constants';

// Define props interface for TabIcon
interface TabIconProps {
  icon: ImageSourcePropType;  // Ensures icon is an image source
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabContainer}>
      <Image 
        source={icon} 
        style={[styles.icon, { tintColor: color }]} 
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: color, fontWeight: focused ? '600' : '400' }]}>
        {name}
      </Text>
    </View>
  );
};

const Tabslayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0A8754',
        tabBarInactiveTintColor: '#fffff',
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen 
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.home} 
              color={color} 
              name="Home" 
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.profile} 
              color={color} 
              name="Profile" 
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70, // Adjust tab bar height for better layout
    paddingBottom: 15, // Ensure text is not too close to the bottom
    backgroundColor: 'white', // Customize background if needed
    borderTopWidth: 1.5, // Optional: add a subtle top border
    borderTopColor: '#ddd',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
    height:80,// Ensures all icons and text align properly
  },
  icon: {
    width: 20, // Adjust icon size for better visibility
    height: 18,
    marginBottom: 1, // Creates spacing between icon and text

  },
  text: {
    fontSize: 10,
    width: 30,
    alignItems: 'center',
    fontWeight: '500',
    
  },
});

export default Tabslayout;
