import {API_KEY as KEY} from '@env';
import axios from 'axios';

const API_KEY = KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string; // Added
    publishedAt: string; // Added
    thumbnails: {
      default: {url: string};
      medium: {url: string};
      high: {url: string}; // Added
    };
  };
}

export const fetchYouTubeVideos = async (
  pageToken: string = '',
): Promise<{videos: Video[]; nextPageToken: string}> => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 10,
        key: API_KEY,
        pageToken,
      },
    });

    const {items, nextPageToken} = response.data;

    return {
      videos: items,
      nextPageToken,
    };
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
};
