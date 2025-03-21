import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkXvgaPP2N40xSO8X87npWr94kVfxtgmU",
  authDomain: "testing-edc4b.firebaseapp.com",
  projectId: "testing-edc4b",
  storageBucket: "testing-edc4b.firebasestorage.app",
  messagingSenderId: "32933288754",
  appId: "1:32933288754:web:2e4545b2601c651239d52b",
};
initializeApp(firebaseConfig);

const db = getFirestore();

export {db};
