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
    const latestMessageId = action.messages.at(-1)?.id;

    // Do something with the action

    const body: SendChatMessageRequestBody = {
      message: "This is the message I want to send to the platform",
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
