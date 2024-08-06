import "dotenv/config";
import express from "express";
import { respondChatMessage } from "./respond-chat-message";
import { actionSchema } from "./schemas";

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/", async (req, res) => {
  const action = actionSchema.parse(req.body);

  switch (action.type) {
    case "do-task": {
      // TODO: Implement do-task handler
      res.json({ message: "OK" });
      break;
    }

    case "respond-chat-message": {
      void respondChatMessage(action);
      break;
    }
  }

  return "OK";
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
