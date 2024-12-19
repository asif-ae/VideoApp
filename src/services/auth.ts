import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export const signInWithGoogle = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

export const signOut = async () => auth().signOut();
