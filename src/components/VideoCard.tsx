import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface VideoCardProps {
  title: string;
  channelTitle: string;
  thumbnails: {
    high?: {url: string};
    medium: {url: string};
    default?: {url: string};
  };
  publishedAt: string;
  onPress: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  channelTitle,
  thumbnails,
  publishedAt,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.videoContainer} onPress={onPress}>
      {/* Thumbnail */}
      <Image
        source={{uri: thumbnails.high?.url || thumbnails.medium.url}}
        style={styles.thumbnail}
      />
      {/* Video Info */}
      <View style={styles.videoDetails}>
        {/* Channel Icon */}
        <Image
          source={{uri: thumbnails.default?.url || thumbnails.medium.url}}
          style={styles.channelIcon}
        />
        <View style={styles.videoMeta}>
          <Text numberOfLines={2} style={styles.videoTitle}>
            {title}
          </Text>
          <Text style={styles.videoInfoText}>
            {channelTitle} • 413K views • {new Date(publishedAt).toDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  videoDetails: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  videoMeta: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  videoInfoText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default VideoCard;
