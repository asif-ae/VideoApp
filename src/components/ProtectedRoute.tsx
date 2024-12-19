import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You must log in to access this page.</Text>
        <Button title="Log In" onPress={login} />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
});
