import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface VideoInfoProps {
  title: string;
  views: string; // e.g., "413K views"
  publishedAt: string; // ISO date string
}

const VideoInfo: React.FC<VideoInfoProps> = ({title, views, publishedAt}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.videoTitle}>{title}</Text>
      <Text style={styles.videoMeta}>
        {views} • {new Date(publishedAt).toDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  videoMeta: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default VideoInfo;
