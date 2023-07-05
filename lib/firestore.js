import { db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

export function createUser(uid, data) {
  console.log("creating user----------------------", db);
  return setDoc(doc(db, "users", uid), data, { merge: true });
}

export function updateAge(uid, age) {
  return setDoc(doc(db, "user-profile", uid), { age }, { merge: true });
}
