import {upload} from './upload.js'
import firebase from "firebase/app"
import 'firebase/storage'

upload('#loadFile', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files) {
        console.log(files)
    }
});


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBghsl5e_7ZyUiObqUkiQGFIT6s9qypOEc",
    authDomain: "file-uploader-10df2.firebaseapp.com",
    projectId: "file-uploader-10df2",
    storageBucket: "file-uploader-10df2.appspot.com",
    messagingSenderId: "811926039915",
    appId: "1:811926039915:web:d609444baf4151e06cf02e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

console.log(storage)
