// import { generateMovieIdentifier } from "@/utils/utils";
import { auth } from "@/lib/firebase-admin";
import { getTickets, createTicket } from "@/lib/firestore-admin";
const handler = async (req, res) => {
  const identifier = req.query.movieid;
  if (!identifier) {
    res.status(400).json({ error: "Missing movie identifier" });
    return;
  }

  if (req.method === "GET") {
    try {
      const tickets = await getTickets(identifier);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    try {
      const { token } = req.headers;
      const { uid } = await auth.verifyIdToken(token);
      const ticket = await createTicket(uid, identifier, req.body);

      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

export default handler;
