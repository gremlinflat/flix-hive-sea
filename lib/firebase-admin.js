import { initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const SERVICE_NAME = "firebase-adminsdk";

//get app SERVICE_NAME, if not exist, initialize app
var app = null;
try {
  app = getApp(SERVICE_NAME);
} catch {
  app = initializeApp(
    {
      credential: cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    },
    SERVICE_NAME
  );
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
