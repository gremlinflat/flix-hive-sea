// import { generateMovieIdentifier } from "@/utils/utils";
import { auth } from "@/lib/firebase-admin";
import { cancelTicket } from "@/lib/firestore-admin";

const handler = async (req, res) => {
  const identifier = req.body.ticket_id;
  if (!identifier) {
    res.status(400).json({ error: "Missing ticket identifier" });
    return;
  }
  if (req.method === "POST") {
    try {
      const { token } = req.headers;
      const { uid } = await auth.verifyIdToken(token);
      const ticket = await cancelTicket(uid, identifier);

      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

export default handler;
