import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB2018Jgo297rlGUzTpdQXWnPsBIUJgBUY",
    authDomain: "chor-50b4b.firebaseapp.com",
    databaseURL: "https://chor-50b4b-default-rtdb.firebaseio.com",
    projectId: "chor-50b4b",
    storageBucket: "chor-50b4b.appspot.com",
    messagingSenderId: "221580429677",
    appId: "1:221580429677:web:ded30441db7a9edcf97264"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 