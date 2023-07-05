import { getUserProfile } from "@/lib/firestore-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req, res) => {
  try {
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(token);
    const profile = await getUserProfile(uid);
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default handler;
