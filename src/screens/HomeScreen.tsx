import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import YouTubePlayer from 'react-native-youtube-iframe';
import {fetchYouTubeVideos, Video} from '../services/youtube';

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
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => setSelectedVideo(item)}>
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

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([newComment, ...comments]);
      setNewComment('');
    }
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

      {/* Modal for Selected Video */}
      <Modal
        visible={!!selectedVideo}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedVideo(null)}>
        <View style={styles.modalContainer}>
          {/* Video Player */}
          {selectedVideo && (
            <>
              <YouTubePlayer
                height={250}
                videoId={selectedVideo.id}
                play={true}
              />

              {/* Video Information */}
              <ScrollView style={styles.detailsContainer}>
                <Text style={styles.videoTitle}>
                  {selectedVideo.snippet.title}
                </Text>
                <Text style={styles.videoMeta}>
                  413K views • {new Date(selectedVideo.snippet.publishedAt).toDateString()}
                </Text>

                {/* Channel Info */}
                <View style={styles.channelContainer}>
                  <Image
                    source={{
                      uri:
                        selectedVideo.snippet.thumbnails.default?.url ||
                        selectedVideo.snippet.thumbnails.medium.url,
                    }}
                    style={styles.channelIcon}
                  />
                  <View style={styles.channelDetails}>
                    <Text style={styles.channelName}>
                      {selectedVideo.snippet.channelTitle}
                    </Text>
                    <Text style={styles.subscriberCount}>7.7K subscribers</Text>
                  </View>
                </View>

                {/* Reaction Buttons */}
                <View style={styles.reactionContainer}>
                  <TouchableOpacity style={styles.reactionButton}>
                    <Icon name="thumbs-up-outline" size={20} color="white" />
                    <Text style={styles.reactionText}>1.4K</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reactionButton}>
                    <Icon name="thumbs-down-outline" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reactionButton}>
                    <Icon name="share-outline" size={20} color="white" />
                    <Text style={styles.reactionText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reactionButton}>
                    <Icon name="download-outline" size={20} color="white" />
                    <Text style={styles.reactionText}>Download</Text>
                  </TouchableOpacity>
                </View>

                {/* Comments Section */}
                <View style={styles.commentsContainer}>
                  <Text style={styles.sectionTitle}>Comments</Text>
                  <View style={styles.addCommentContainer}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Add a comment..."
                      placeholderTextColor="#888"
                      value={newComment}
                      onChangeText={setNewComment}
                      onSubmitEditing={addComment}
                    />
                    <TouchableOpacity onPress={addComment}>
                      <Icon name="send-outline" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                  {comments.map((comment, index) => (
                    <Text key={index} style={styles.commentText}>
                      {comment}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
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
  channelContainer: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  channelDetails: {flex: 1, marginLeft: 10},
  channelName: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  subscriberCount: {color: 'gray', fontSize: 12},
  reactionContainer: {flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10},
  reactionButton: {alignItems: 'center'},
  reactionText: {color: 'white', fontSize: 12, marginTop: 5},
  commentsContainer: {marginVertical: 20},
  sectionTitle: {color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  addCommentContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  commentInput: {flex: 1, color: 'white', backgroundColor: '#333', borderRadius: 5, paddingHorizontal: 10, marginRight: 10},
  commentText: {color: 'white', marginBottom: 5},
});
