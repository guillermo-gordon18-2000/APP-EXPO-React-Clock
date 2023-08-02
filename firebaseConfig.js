import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDx8QhQxLBjtALjO0BtnwyvkH-CH8DD_Pk",
  authDomain: "congreso-a1e49.firebaseapp.com",
  databaseURL: "https://congreso-a1e49-default-rtdb.firebaseio.com",
  projectId: "congreso-a1e49",
  storageBucket: "congreso-a1e49.appspot.com",
  messagingSenderId: "417617007289",
  appId: "1:417617007289:web:35c124ab86b7fcdbbf4168",
};
//
const firebaseConfig_2 = {
  apiKey: "AIzaSyBjlNk-dwS0u3-YEsBfky7RDbWbxxubX6Q",

  authDomain: "fb-api-4000.firebaseapp.com",
  projectId: "fb-api-4000",

  storageBucket: "fb-api-4000.appspot.com",

  messagingSenderId: "165587736909",

  appId: "1:165587736909:web:b17cbb7971b86d609dff04",

  measurementId: "G-0WMQ6LG79R",
};
//firebase.initializeApp(firebaseConfig_2);
//
// const auth_2 = firebase.auth();
// const db_2 = firebase.firestore();
// const storage_2 = firebase.storage(); // Agrega esta línea
// // Método para autenticar a los usuarios
// export const signInWithEmailAndPassword_2 = (email, password) => {
//   return auth_2.signInWithEmailAndPassword_2(email, password);
// };
const app = firebase.initializeApp(firebaseConfig, "firebaseConfig");

// Inicializar Firebase 2
const app2 = firebase.initializeApp(firebaseConfig_2, "firebaseConfig_2");

// Obtener los servicios de Firebase para cada configuración
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();

const auth2 = app2.auth();
const db2 = app2.firestore();
const storage2 = app2.storage();

// Exportar los servicios de Firebase para cada configuración
export { auth, db, storage, auth2, db2, storage2 };
