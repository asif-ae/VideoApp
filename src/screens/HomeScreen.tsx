import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchYouTubeVideos, Video} from '../services/youtube';

export const HomeScreen: React.FC = ({navigation}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async (pageToken: string = '') => {
    try {
      setLoading(pageToken === '');
      setLoadingMore(pageToken !== '');

      const {videos: newVideos, nextPageToken: newNextPageToken} =
        await fetchYouTubeVideos(pageToken);

      setVideos(prev => [...prev, ...newVideos]);
      setNextPageToken(newNextPageToken);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderVideoItem = ({item}: {item: Video}) => {
    const {title, channelTitle, thumbnails, publishedAt} = item.snippet;

    return (
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() =>
          navigation.navigate('VideoDetails', {
            videoId: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            views: '413K', // Replace with actual view count if available
            publishedAt: item.snippet.publishedAt,
          })
        }>
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
              {channelTitle} • 413K views •{' '}
              {new Date(publishedAt).toDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>YouTube</Text>
        <View style={styles.headerIcons}>
          <Icon name="notifications-outline" size={24} color="white" />
          <Icon
            name="search-outline"
            size={24}
            color="white"
            style={{marginLeft: 15}}
          />
        </View>
      </View>

      {/* Videos List */}
      {loading && <ActivityIndicator size="large" />}
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={() => loadVideos(nextPageToken)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" style={styles.footerLoader} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
  categoryContainer: {
    marginVertical: 10,
  },
  categoryChip: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
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
  footerLoader: {
    marginVertical: 10,
  },
});
