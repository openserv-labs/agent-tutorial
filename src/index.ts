import "dotenv/config";
import express from "express";
import { Action } from "../lib/interfaces";
import { doTask } from "./do-task";
import { respondChatMessage } from "./respond-chat-message";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

// Define a POST route to handle incoming requests from the platform
app.post("/", async (req, res) => {
  const action = req.body as Action;

  // Determine the type of action and handle accordingly
  switch (action.type) {
    // If the action type is 'do-task', execute the doTask function
    case "do-task": {
      doTask(action);
      break;
    }

    // If the action type is 'respond-chat-message', execute the respondChatMessage function
    case "respond-chat-message": {
      void respondChatMessage(action);
      break;
    }
  }

  // Send a JSON response indicating that the request was received successfully. This will set the task to 'in-progress' on the platform.
  res.json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
