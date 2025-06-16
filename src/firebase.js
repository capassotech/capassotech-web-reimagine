// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAWufZr_3fkkJuVgjmkbYETj5lNML3fuCU",
    authDomain: "capassotech.firebaseapp.com",
    databaseURL: "https://capassotech-default-rtdb.firebaseio.com",
    projectId: "capassotech",
    storageBucket: "capassotech.firebasestorage.app",
    messagingSenderId: "127439714938",
    appId: "1:127439714938:web:639f2e3e959637e29999c3",
    measurementId: "G-YZJ426MMB6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación
export const auth = getAuth(app);

// Exporta la instancia de Realtime Database
export const database = getDatabase(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);