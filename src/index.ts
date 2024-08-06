import "dotenv/config";
import express from "express";
import { Action } from "./interfaces";
import { respondChatMessage } from "./respond-chat-message";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.post("/", async (req, res) => {
  const action = req.body as Action;

  switch (action.type) {
    case "do-task": {
      // TODO: Implement do-task handler
      res.json({ message: "OK" });
      break;
    }

    case "respond-chat-message": {
      void respondChatMessage(action);
      res.json({ message: "OK" });
      break;
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
