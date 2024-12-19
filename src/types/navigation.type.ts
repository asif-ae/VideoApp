import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  VideoDetails: { video: any }; // Add appropriate type for `video` if known
  SavedVideos: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type AppStackParamList = {
  Home: undefined;
  VideoDetails: {
    videoId: string | undefined;
    title: string;
    description: string;
    channelTitle: string;
    views: string;
    publishedAt: string;
  };
};

export type VideoPlayerProps = NativeStackScreenProps<AppStackParamList, 'VideoDetails'>;

