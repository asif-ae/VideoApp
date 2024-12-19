import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    // Add your logout logic here
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/150',
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon} onPress={() => setIsEditing(!isEditing)}>
          <Icon name="pencil-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Fields */}
      <View style={styles.profileDetails}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputActive]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputActive]}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          placeholder="Enter your email"
          placeholderTextColor="#999"
        />

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#444', // Dark border
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 20,
  },
  profileDetails: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#aaa', // Gray labels
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#222', // Darker gray input background
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#fff', // White text
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputActive: {
    borderColor: '#007bff', // Blue border when editing
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4757',
    padding: 12,
    borderRadius: 8,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
