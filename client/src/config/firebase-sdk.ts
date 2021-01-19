import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj7ja3x0beEvXYAPqApOx81KXnPRxAyQ0",
    authDomain: "gang-pizza.firebaseapp.com",
    databaseURL: "https://gang-pizza.firebaseio.com",
    projectId: "gang-pizza",
    storageBucket: "gang-pizza.appspot.com",
    messagingSenderId: "882067082141",
    appId: "1:882067082141:web:391478f6511757991a7d74"
};
// Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);
export default appFirebase;