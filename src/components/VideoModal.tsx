import React from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import YouTubePlayer from 'react-native-youtube-iframe';
import {Video} from '../services/youtube';
import ChannelInfo from './ChannelInfo';
import Comments from './Comments';
import Reactions from './Reactions';
import VideoInfo from './VideoInfo';

interface VideoModalProps {
  visible: boolean;
  selectedVideo: Video | null;
  onClose: () => void;
  comments: string[];
  newComment: string;
  setNewComment: (text: string) => void;
  onAddComment: () => void;
  onLikePress: () => void;
  onDislikePress: () => void;
  onSharePress: () => void;
  onDownloadPress: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  selectedVideo,
  onClose,
  comments,
  newComment,
  setNewComment,
  onAddComment,
  onLikePress,
  onDislikePress,
  onSharePress,
  onDownloadPress,
}) => {
  const handleGesture = (event: any) => {
    const {translationY} = event.nativeEvent;

    // Close modal if the swipe is sufficiently downward
    if (translationY > 100) {
      onClose();
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          {selectedVideo && (
            <>
              {/* Pan Gesture Handler for YouTubePlayer */}
              <PanGestureHandler onGestureEvent={handleGesture}>
                <View>
                  {/* Video Player */}
                  <YouTubePlayer
                    height={250}
                    videoId={selectedVideo.id}
                    play={true}
                  />
                </View>
              </PanGestureHandler>

              {/* Video Details */}
              <ScrollView style={styles.detailsContainer}>
                <VideoInfo
                  title={selectedVideo.snippet.title}
                  views="413K views"
                  publishedAt={selectedVideo.snippet.publishedAt}
                />

                {/* Channel Info */}
                <ChannelInfo
                  channelTitle={selectedVideo.snippet.channelTitle}
                  thumbnailUrl={
                    selectedVideo.snippet.thumbnails.default?.url ||
                    selectedVideo.snippet.thumbnails.medium.url
                  }
                  subscriberCount="7.7K subscribers"
                />

                {/* Reactions */}
                <Reactions
                  reactions={[
                    {
                      name: 'thumbs-up-outline',
                      label: '1.4K',
                      onPress: onLikePress,
                    },
                    {name: 'thumbs-down-outline', onPress: onDislikePress},
                    {
                      name: 'share-outline',
                      label: 'Share',
                      onPress: onSharePress,
                    },
                    {
                      name: 'download-outline',
                      label: 'Download',
                      onPress: onDownloadPress,
                    },
                    {
                      name: 'close-outline',
                      label: 'Close',
                      onPress: onClose,
                    },
                  ]}
                />

                {/* Comments */}
                <Comments
                  comments={comments}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  onAddComment={onAddComment}
                />
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  detailsContainer: {
    padding: 10,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default VideoModal;
