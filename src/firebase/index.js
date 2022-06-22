import firebase from "firebase/compat/app"
import  "firebase/compat/auth"
import  "firebase/compat/firestore"
import {firebaseConfig} from "./config";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export const FirebaseTimestamp = firebase.firestore.Timestamp;
export const FieldValue = firebase.firestore.FieldValue;
