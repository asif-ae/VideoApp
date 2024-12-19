import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const SavedVideosScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSavedVideos = async () => {
      const snapshot = await firestore().collection('savedVideos').get();
      setVideos(snapshot.docs.map((doc) => doc.data()));
    };

    fetchSavedVideos();
  }, []);

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('VideoDetails', { video: item })}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
