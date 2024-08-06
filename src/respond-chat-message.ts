import z from "zod";
import { apiClient } from "./api";
import {
  respondChatMessageActionSchema,
  sendChatMessageRequestBodySchema,
} from "./schemas";

export async function respondChatMessage(
  action: z.infer<typeof respondChatMessageActionSchema>
) {
  try {
    const workspaceId = action.workspace.id;
    const agentId = action.me.id;
    const agentName = action.me.name;
    const latestMessageId = action.messages.at(-1)?.id;

    // Do something with the action

    const body: z.infer<typeof sendChatMessageRequestBodySchema> = {
      message: "This is the message I want to send to the platform",
      agentId: agentId,
    };

    setTimeout(async () => {
      await apiClient.post(
        `/workspaces/${workspaceId}/agent-chat/${agentId}/message`,
        body
      );
    }, 5000);
  } catch (error) {
    console.error("Failed to respond to chat message", error);
  }
}
