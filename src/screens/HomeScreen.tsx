import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import ChannelInfo from '../components/ChannelInfo';
import Comments from '../components/Comments';
import Header from '../components/Header';
import Reactions from '../components/Reactions';
import VideoCard from '../components/VideoCard';
import VideoInfo from '../components/VideoInfo';
import {fetchYouTubeVideos, Video} from '../services/youtube';
import VideoModal from '../components/VideoModal';

export const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // State for selected video
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<string[]>([
    'This is such an informative video!',
    'Great content, keep it up!',
  ]);
  const [newComment, setNewComment] = useState<string>('');

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
      <VideoCard
        title={title}
        channelTitle={channelTitle}
        thumbnails={thumbnails}
        publishedAt={publishedAt}
        onPress={() => {
          console.log({item});
          setSelectedVideo(item);
        }}
      />
    );
  };

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([newComment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikePress = () => {
    console.log('Like button pressed');
  };

  const handleDislikePress = () => {
    console.log('Dislike button pressed');
  };

  const handleSharePress = () => {
    console.log('Share button pressed');
  };

  const handleDownloadPress = () => {
    console.log('Download button pressed');
  };

  console.log({Boolean: Boolean(selectedVideo?.id)});

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        logoText="YouTube"
        onNotificationPress={() => {}}
        onSearchPress={() => {}}
      />

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

      {/* Modal for Selected Video */}
      <VideoModal
        visible={Boolean(selectedVideo)}
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        onAddComment={addComment}
        onLikePress={handleLikePress}
        onDislikePress={handleDislikePress}
        onSharePress={handleSharePress}
        onDownloadPress={handleDownloadPress}
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  videoDescription: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  channelDetails: {flex: 1, marginLeft: 10},
  channelName: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  subscriberCount: {color: 'gray', fontSize: 12},
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  reactionButton: {alignItems: 'center'},
  reactionText: {color: 'white', fontSize: 12, marginTop: 5},
  commentsContainer: {marginVertical: 20},
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    color: 'white',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentText: {color: 'white', marginBottom: 5},
});
