import FormData from "form-data";
import OpenAI from "openai";
import { apiClient } from "../lib/api";
import { DoTaskAction } from "../lib/interfaces";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function doTask(action: DoTaskAction) {
  const workspaceId = action.workspace.id;
  const taskId = action.task.id;
  const taskObjective = action.task.description;
  const taskInput = action.task.input || "";
  const taskExpectedOutput = action.task.expectedOutput || "";
  const agentId = action.me.id;

  // Prepare the messages to send to the OpenAI API
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `Summarize the given text in exactly three sentences. Capture the main points and key insights. Ensure clarity and coherence. Use concise and straightforward language.`,
    },
    {
      role: "user",
      content: `Objective: ${taskObjective}
Input: ${taskInput}
Expected Output: ${taskExpectedOutput}`,
    },
  ];

  try {
    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    const result = completion.choices[0].message?.content || "No response";

    // Create a buffer from the result string
    const resultBuffer = Buffer.from(result, "utf-8");

    // Upload the file to the platform
    const form = new FormData();
    form.append("file", resultBuffer, {
      filename: `task-${taskId}-output.txt`,
      contentType: "text/plain",
    });
    form.append("agentId", agentId.toString());
    form.append("path", "text-summary.txt");
    form.append("taskIds", action.task.id.toString());
    form.append("skipSummarizer", "true");

    await apiClient.post(`/workspaces/${workspaceId}/file`, form);

    // Mark the task as complete
    await apiClient.put(`/workspaces/${workspaceId}/tasks/${taskId}/complete`, {
      output: "The summary has been uploaded",
    });
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);

    await apiClient.post(`/workspaces/${workspaceId}/tasks/${taskId}/error`, {
      error: "Something went wrong",
    });
  }
}
