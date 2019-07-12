import firebase from 'firebase';
import 'firebase/auth';
import env from './env';

firebase.initializeApp(env);

export default firebase;