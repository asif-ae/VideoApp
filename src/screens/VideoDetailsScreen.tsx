import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { VideoPlayerProps } from '../types/navigation.type';

export const VideoDetailsScreen: React.FC<VideoPlayerProps> = ({ route }) => {
  const { videoId, title, description, channelTitle, views, publishedAt } = route.params;

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment]);
      setNewComment('');
    }
  };

  const renderCommentItem = ({ item }: { item: string }) => (
    <View style={styles.commentContainer}>
      <Icon name="person-circle-outline" size={30} color="gray" />
      <Text style={styles.commentText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          style={styles.webview}
          allowsFullscreenVideo
        />
      </View>

      {/* Video Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.videoTitle}>{title}</Text>
        <Text style={styles.videoInfo}>
          {channelTitle} • {views} views • {new Date(publishedAt).toDateString()}
        </Text>
        <Text style={styles.videoDescription}>{description}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="thumbs-up-outline" size={24} color="white" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="thumbs-down-outline" size={24} color="white" />
          <Text style={styles.actionText}>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-social-outline" size={24} color="white" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments</Text>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item, index) => `comment-${index}`}
        />
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="gray"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
            <Icon name="send-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height: 200,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  videoInfo: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  commentsContainer: {
    flex: 1,
    padding: 10,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 14,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
});
