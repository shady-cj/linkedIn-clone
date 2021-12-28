import firebase from "firebase/compat/app";
import "firebase/compat/storage";

import "firebase/compat/auth";

import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBzkJpeth1Jz0XQDlWlB5umJqxb4nUaJ2M",

    authDomain: "shady-linkedin-clone.firebaseapp.com",

    projectId: "shady-linkedin-clone",

    storageBucket: "shady-linkedin-clone.appspot.com",

    messagingSenderId: "760694878599",

    appId: "1:760694878599:web:ccabda9f9dc9b1480f2322",

    measurementId: "G-J4MRD8MWQQ",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;

// const app = initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = authenticate();
// const provider = new authenticate.GoogleAuthProvider();
// const storage = store();

// export { auth, provider, storage };
// export default db;
