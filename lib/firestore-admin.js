import { parse } from "date-fns";
import { db } from "./firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

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

export async function getUsername(uid) {
  try {
    const snapshot = await db.collection("users").doc(uid).get();
    if (snapshot.data()) {
      const data = snapshot.data();
      return data.name;
    } else {
      console.log("No such document! user not found");
      return null;
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

export async function incrementCredit(uid, credit) {
  try {
    const docRef = await db
      .collection("user-profile")
      .doc(uid)
      .update({
        credit: FieldValue.increment(credit),
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

export async function getTickets(movie_id) {
  try {
    const snapshot = await db
      .collection("tickets")
      .where("movie_id", "==", movie_id)
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return null;
    }
    const tickets = [];
    snapshot.forEach((doc) => {
      tickets.push(doc.data());
    });
    return tickets;
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
}

export async function createTicket(uid, movie_id, data) {
  try {
    const user_name = await getUsername(uid);
    let payload = {
      user_id: uid,
      user_name: user_name,
      movie_id,
      ...data,
      created_at: Date.now(),
      status: "booked", // cancelled, booked, pending
    };
    const docRef = await db.collection("tickets").add(payload);

    const total = parseInt(data.total) || 0;
    const credit = await incrementCredit(uid, total * -1);

    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}

export async function getTicket(ticket_id) {
  try {
    const docRef = await db.collection("tickets").doc(ticket_id).get();
    if (docRef.empty) {
      console.log("No matching documents.");
      return null;
    }
    return docRef.data();
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
}

export async function cancelTicket(uid, ticket_id) {
  try {
    const docRef = await db.collection("tickets").doc(ticket_id).update({
      status: "cancelled",
    });
    console.log("Document written: ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}

export async function getAllTicket(uid) {
  try {
    const snapshot = await db
      .collection("tickets")
      .where("user_id", "==", uid)
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return [];
    }
    const tickets = [];
    //return data wiht id
    snapshot.forEach((doc) => {
      tickets.push({ ...doc.data(), id: doc.id });
    });
    return tickets;
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
}
