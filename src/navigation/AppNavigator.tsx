import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import { HomeScreen } from '../screens';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <AuthProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Home') {
              return <Icon name="home-outline" size={size} color={color} />;
            }
            if (route.name === 'Profile') {
              return <Icon name="person-outline" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarPosition: 'bottom', // Ensures the tab bar stays at the bottom
          headerShown: false, // Hides any header for the tab screens
          tabBarStyle: {
            backgroundColor: 'black', // Set the tab bar background color
          },
        })}>
        {/* Public Screen */}
        <Tab.Screen name="Home" component={HomeScreen} />

        {/* Private Screen */}
        <Tab.Screen
          name="Profile"
          children={() => (
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </AuthProvider>
);
