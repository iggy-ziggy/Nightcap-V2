import app from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyATd-cXIDX-3YQV-rZU4XTAuu1hYUExl60",
    authDomain: "nightcap-24dad.firebaseapp.com",
    databaseURL: "https://nightcap-24dad.app.com",
    projectId: "nightcap-24dad",
    storageBucket: "nightcap-24dad.appspot.com",
    messagingSenderId: "490604626131",
    appId: "1:490604626131:web:61c02ae99f289711fe9426"
  };

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.storage();
  };
};

export default new Firebase();
