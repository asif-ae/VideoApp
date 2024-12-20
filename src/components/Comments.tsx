import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CommentsProps {
  comments: string[];
  newComment: string;
  onAddComment: () => void;
  setNewComment: (text: string) => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  newComment,
  onAddComment,
  setNewComment,
}) => {
  return (
    <View style={styles.commentsContainer}>
      {/* Comments Section Title */}
      <Text style={styles.sectionTitle}>Comments</Text>
      {/* Add Comment Input */}
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
          onSubmitEditing={onAddComment}
        />
        <TouchableOpacity onPress={onAddComment}>
          <Icon name="send-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Comments List */}
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <Text style={styles.commentText} key={`${index}`}>
            {comment}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    marginVertical: 20,
  },
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
  commentText: {
    color: 'white',
    marginBottom: 5,
  },
});

export default Comments;
