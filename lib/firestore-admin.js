import { db } from "./firebase-admin";
// import { setDoc, getDoc, doc, collection } from "firebase/firestore";

export function updateUserAge(uid, age) {
  return setDoc(doc(db, "user-profile", uid), { age }, { merge: true });
}

export async function getUserProfile(uid) {
  try {
    const snapshot = await db.collection("user-profile").doc(uid).get();
    if (snapshot.data()) {
      const data = snapshot.data();
      return data;
    } else {
      console.log("No such document!, creating user profile");
      const newProfile = await createUserProfile(uid, { age: -1, credit: 0 });
      return newProfile.data();
    }
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
}

export async function createUserProfile(uid, data) {
  try {
    const docRef = await db.collection("user-profile").doc(uid).set(data);
    console.log("Document written: ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}

export async function updateCredit(uid, credit) {
  try {
    const docRef = await db.collection("user-profile").doc(uid).update({
      credit,
    });
    console.log("Document written: ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}

export async function updateAge(uid, age) {
  try {
    const docRef = await db.collection("user-profile").doc(uid).update({
      age,
    });
    console.log("Document written: ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}
