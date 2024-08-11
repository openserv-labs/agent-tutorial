import FormData from "form-data";
import OpenAI from "openai";
import { apiClient } from "../lib/api";
import { DoTaskAction } from "../lib/interfaces";

// this agent uses the OpenAI API to perform a task
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to handle the 'do-task' action
export async function doTask(action: DoTaskAction) {
  // Extract necessary information from the action object
  const workspaceId = action.workspace.id; // ID of the workspace where the task is located
  const taskId = action.task.id; // ID of the specific task
  const taskObjective = action.task.description; // Description of the task's objective
  const taskInput = action.task.input || ""; // Input provided for the task (if any)
  const taskExpectedOutput = action.task.expectedOutput || ""; // Expected output of the task (if any)
  const agentId = action.me.id; // ID of the agent handling the task

  // Prepare the messages that will be sent to the OpenAI API for generating the task output
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
    // Call the OpenAI API to generate a summary based on the input provided
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    const result = completion.choices[0].message?.content || "No response";

    // Convert the result string into a buffer for file upload
    const resultBuffer = Buffer.from(result, "utf-8");

    // Prepare the form data for uploading the file to the platform
    const form = new FormData();
    form.append("file", resultBuffer, {
      filename: `task-${taskId}-output.txt`,
      contentType: "text/plain",
    });
    form.append("agentId", agentId.toString()); // Attach the agent's ID
    form.append("path", "text-summary.txt"); // Specify the path where the file should be saved
    form.append("taskIds", action.task.id.toString()); // Associate the file with the specific task ID
    form.append("skipSummarizer", "true"); // The platform performs some kind of file summarization, so we skip it for this demo

    // Upload the generated summary to the OpenServ platform
    await apiClient.post(`/workspaces/${workspaceId}/file`, form);

    // Mark the task as complete on the platform
    await apiClient.put(`/workspaces/${workspaceId}/tasks/${taskId}/complete`, {
      output: "The summary has been uploaded",
    });
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);

    // Report the error to the platform by marking the task as errored
    await apiClient.post(`/workspaces/${workspaceId}/tasks/${taskId}/error`, {
      error: "Something went wrong", // General error message
    });
  }
}
