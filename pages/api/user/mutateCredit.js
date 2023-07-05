import { updateCredit } from "@/lib/firestore-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(token);
    const { uid } = await auth.verifyIdToken(token);
    const credit = await updateCredit(uid, req.body.credit);
    res.status(200).json(credit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default handler;
