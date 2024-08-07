import "dotenv/config";
import express from "express";
import { Action } from "../lib/interfaces";
import { doTask } from "./do-task";
import { respondChatMessage } from "./respond-chat-message";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.post("/", async (req, res) => {
  const action = req.body as Action;

  switch (action.type) {
    case "do-task": {
      doTask(action);
      break;
    }

    case "respond-chat-message": {
      void respondChatMessage(action);
      break;
    }
  }
  res.json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
