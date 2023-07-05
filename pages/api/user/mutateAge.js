import { updateAge } from "@/lib/firestore-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(token);
    const { uid } = await auth.verifyIdToken(token);
    const age = await updateAge(uid, req.body.age);
    res.status(200).json(age);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default handler;
