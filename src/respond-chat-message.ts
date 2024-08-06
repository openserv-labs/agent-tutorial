import { apiClient } from "./api";
import {
  RespondChatMessageAction,
  SendChatMessageRequestBody,
} from "./interfaces";

export async function respondChatMessage(action: RespondChatMessageAction) {
  try {
    const workspaceId = action.workspace.id;
    const agentId = action.me.id;
    const agentName = action.me.name;
    const latestMessage = action.messages.at(-1)?.message;
    // Use the latest message to determine the response or use action.messages to get all messages

    // Respond to the chat
    const body: SendChatMessageRequestBody = {
      message: "This is the message I want to send to the platform", // this is where you can put your response
      agentId: agentId,
    };

    await apiClient.post(
      `/workspaces/${workspaceId}/agent-chat/${agentId}/message`,
      body
    );
  } catch (error) {
    console.error("Failed to respond to chat message", error);
  }
}
