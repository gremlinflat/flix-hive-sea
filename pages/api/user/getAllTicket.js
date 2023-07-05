import { getAllTicket } from "@/lib/firestore-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req, res) => {
  try {
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(token);
    const data = await getAllTicket(uid);
    res.status(200).json(data);
  } catch (error) {
    // console.log("error disini su", error);
    // // console.log(error);
    // res.status(500).json({ error });
  }
};

export default handler;
