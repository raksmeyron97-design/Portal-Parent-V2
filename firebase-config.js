// នាំចូល (Import) មុខងារចាំបាច់ពី Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    initializeFirestore, 
    persistentLocalCache, 
    persistentMultipleTabManager,
    doc, 
    getDoc, 
    collection, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ព័ត៌មាន (Credentials) សម្រាប់ភ្ជាប់ទៅគម្រោង Firebase របស់អ្នក
const firebaseConfig = {
    apiKey: "AIzaSyBU50HJrekgHWwwyLq5CTRwhjHkGJAAAfs",
    authDomain: "classroom-management-82382.firebaseapp.com",
    projectId: "classroom-management-82382",
    storageBucket: "classroom-management-82382.firebasestorage.app",
    messagingSenderId: "146641865620",
    appId: "1:146641865620:web:ce693b7b064afd5d1bdd81"
};

// ចាប់ផ្តើមដំណើរការ Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ចាប់ផ្តើម Firestore ជាមួយមុខងារ Offline Caching (ដើម្បីឱ្យ App ដើរលឿន)
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});

// App ID របស់អ្នក
const PTEC_APP_ID = "ptec-app";

// Export មុខងារទាំងអស់នេះចេញ ដើម្បីឱ្យឯកសារ HTML ផ្សេងៗអាចហៅយកទៅប្រើបាន
export { 
    app, 
    auth, 
    db, 
    PTEC_APP_ID, 
    signInAnonymously, 
    onAuthStateChanged, 
    doc, 
    getDoc, 
    collection, 
    onSnapshot 
};