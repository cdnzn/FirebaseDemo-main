import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyDieTu9iRnGuKNtUXSh-CAQbPHJ50Qq-tw",
  authDomain: "reactdemo112024.firebaseapp.com",
  projectId: "reactdemo112024",
  storageBucket: "reactdemo112024.firebasestorage.app",
  messagingSenderId: "124253520819",
  appId: "1:124253520819:web:fa2685894da93da47a41c6",
  measurementId: "G-EPFJDKJ61Y"

};


  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}