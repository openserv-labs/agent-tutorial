export type TaskStatus =
  | "to-do"
  | "in-progress"
  | "human-assistance-required"
  | "error"
  | "done";

export interface Agent {
  id: number;
  name: string;
  capabilities_description: string;
}

export interface Attachment {
  id: number;
  path: string;
  fullUrl: string;
  summary?: string | null;
}

export interface Dependency {
  id: number;
  description: string;
  output?: string | null;
  status: TaskStatus;
  attachments: Attachment[];
}

export interface HumanAssistanceRequest {
  agentDump: unknown;
  humanResponse?: string | null;
  id: number;
  question: string;
  status: "pending" | "responded";
  type: "text" | "project-manager-plan-review";
}

export interface Task {
  id: number;
  description: string;
  body?: string | null;
  expectedOutput?: string | null;
  input?: string | null;
  dependencies: Dependency[];
  humanAssistanceRequests: HumanAssistanceRequest[];
}

export interface Workspace {
  id: number;
  goal: string;
  bucket_folder: string;
  agents: Agent[];
}

export interface DoTaskAction {
  type: "do-task";
  me: Me;
  task: Task;
  workspace: Workspace;
}

export interface RespondChatMessageAction {
  type: "respond-chat-message";
  me: Me;
  messages: Message[];
  workspace: Workspace;
}

export type Action = DoTaskAction | RespondChatMessageAction;

export interface SendChatMessageRequestBody {
  message: string;
  agentId?: number;
}

export interface Me {
  id: number;
  name: string;
  isBuiltByAgentBuilder: boolean;
  systemPrompt?: string;
}

export interface Message {
  author: "agent" | "user";
  createdAt: Date;
  id: number;
  message: string;
}
