import { apiClient } from "../lib/api";
import {
  RespondChatMessageAction,
  SendChatMessageRequestBody,
} from "../lib/interfaces";

// Function to handle the 'respond-chat-message' action
export async function respondChatMessage(action: RespondChatMessageAction) {
  try {
    // Extract necessary details from the action object
    const workspaceId = action.workspace.id; // ID of the workspace where the chat is taking place
    const agentId = action.me.id; // ID of the agent responding to the chat
    const agentName = action.me.name; // Name of the agent responding to the chat
    const latestMessage = action.messages.at(-1)?.message; // Retrieve the latest message in the chat

    // The latest message can be used to determine the appropriate response, or you can analyze all messages in action.messages

    // Prepare the body of the response to be sent to the platform
    const body: SendChatMessageRequestBody = {
      message: "This is the message I want to send to the platform", // Replace this with the actual response message
      agentId: agentId,
    };

    // Send the response message to the OpenServ platform
    await apiClient.post(
      `/workspaces/${workspaceId}/agent-chat/${agentId}/message`,
      body
    );
  } catch (error) {
    // Log an error message if the response fails
    console.error("Failed to respond to chat message", error);
  }
}
