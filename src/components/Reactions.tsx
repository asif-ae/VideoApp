import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Reaction {
  name: string; // Icon name, e.g., "thumbs-up-outline"
  label?: string; // Optional label, e.g., "1.4K" or "Share"
  onPress?: () => void; // Optional callback for button press
}

interface ReactionsProps {
  reactions: Reaction[];
}

const Reactions: React.FC<ReactionsProps> = ({reactions}) => {
  return (
    <View style={styles.reactionContainer}>
      {reactions.map((reaction, index) => (
        <TouchableOpacity
          key={index}
          style={styles.reactionButton}
          onPress={reaction.onPress}>
          <Icon name={reaction.name} size={20} color="white" />
          {reaction.label && <Text style={styles.reactionText}>{reaction.label}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  reactionButton: {
    alignItems: 'center',
  },
  reactionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Reactions;
