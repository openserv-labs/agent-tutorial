import FormData from "form-data";
import fs from "fs";
import OpenAI from "openai";
import path from "path";
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
  const agentId = action.me.id;

  // Prepare the messages to send to the OpenAI API
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Objective: ${taskObjective}\nInput: ${taskInput}\nExpected Output: ${taskExpectedOutput}`,
    },
  ];

  try {
    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    const result = completion.choices[0].message?.content || "No response";

    // Write the result to a file
    const filePath = path.join(__dirname, `task-${taskId}-output.txt`);
    fs.writeFileSync(filePath, result, "utf8");

    // Upload the file to the platform
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("agentId", agentId.toString());
    form.append("path", "text-summary.txt");
    form.append("taskIds", action.task.id.toString());
    form.append("skipSummarizer", "true");

    await apiClient.post(`/workspaces/${workspaceId}/file`, form);

    // Mark the task as complete
    await apiClient.put(`/workspaces/${workspaceId}/tasks/${taskId}/complete`, {
      output: "The summary has been uploaded",
    });

    // Delete the file
    fs.unlinkSync(filePath);
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);

    await apiClient.post(`/workspaces/${workspaceId}/tasks/${taskId}/error`, {
      error: "Something went wrong",
    });
  }
}
