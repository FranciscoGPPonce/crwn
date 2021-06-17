import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDCWcBOkd-vkVZ8XIAfgOX0bk-zb9gjB3s",
    authDomain: "crwn-db-63e49.firebaseapp.com",
    projectId: "crwn-db-63e49",
    storageBucket: "crwn-db-63e49.appspot.com",
    messagingSenderId: "949148512056",
    appId: "1:949148512056:web:ec31348965195e31221bcd",
    measurementId: "G-LLLESS46Y9"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            alert('eroor creating user')
            console.log('error creating user', error.message)
        }
    }

    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;