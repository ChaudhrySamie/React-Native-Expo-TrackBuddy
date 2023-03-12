//Set up the Firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzvM6LS0L4T7uSPeS8PHR76iCyMiQr_DA",
  authDomain: "agentsam-a98c0.firebaseapp.com",
  projectId: "agentsam-a98c0",
  storageBucket: "agentsam-a98c0.appspot.com",
  messagingSenderId: "596942627348",
  appId: "1:596942627348:web:670fb43536b66a5dfe7d01"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export{firebase};