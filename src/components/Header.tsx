import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  logoText: string;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  logoText = 'YouTube',
  onNotificationPress,
  onSearchPress,
}) => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Text style={styles.logo}>{logoText}</Text>
      {/* Header Icons */}
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onNotificationPress}>
          <Icon name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSearchPress}>
          <Icon
            name="search-outline"
            size={24}
            color="white"
            style={{marginLeft: 15}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
});

export default Header;
