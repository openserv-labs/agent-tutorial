import OpenAI from "openai";
import { systemPrompt } from "./agent-system-prompt";
import { apiClient } from "./api";
import { DoTaskAction } from "./interfaces";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function doTask(action: DoTaskAction) {
  const workspaceId = action.workspace.id;
  const taskId = action.task.id;
  const taskObjective = action.task.description;
  const taskInput = action.task.input || "";
  const taskExpectedOutput = action.task.expectedOutput || "";

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Objective: ${taskObjective}` },
    { role: "user", content: `Input: ${taskInput}` },
    { role: "user", content: `Expected Output: ${taskExpectedOutput}` },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    const result = completion.choices[0].message?.content || "No response";

    await apiClient.put(`/workspaces/${workspaceId}/tasks/${taskId}/complete`, {
      output: result,
    });
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);

    await apiClient.post(`/workspaces/${workspaceId}/tasks/${taskId}/error`, {
      error: "Something went wrong",
    });
  }
}
