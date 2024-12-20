import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface ChannelInfoProps {
  channelTitle: string;
  thumbnailUrl: string;
  subscriberCount: string; // e.g., "7.7K subscribers"
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channelTitle,
  thumbnailUrl,
  subscriberCount,
}) => {
  return (
    <View style={styles.channelContainer}>
      {/* Channel Thumbnail */}
      <Image source={{uri: thumbnailUrl}} style={styles.channelIcon} />
      {/* Channel Details */}
      <View style={styles.channelDetails}>
        <Text style={styles.channelName}>{channelTitle}</Text>
        <Text style={styles.subscriberCount}>{subscriberCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscriberCount: {
    color: 'gray',
    fontSize: 12,
  },
});

export default ChannelInfo;
