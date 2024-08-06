import { z } from "zod";

const taskStatusSchema = z.enum([
  "to-do",
  "in-progress",
  "human-assistance-required",
  "error",
  "done",
]);

export const doTaskActionSchema = z.object({
  type: z.literal("do-task"),
  me: z.intersection(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
    z.discriminatedUnion("isBuiltByAgentBuilder", [
      z.object({
        isBuiltByAgentBuilder: z.literal(false),
      }),
      z.object({
        isBuiltByAgentBuilder: z.literal(true),
        systemPrompt: z.string(),
      }),
    ])
  ),
  task: z.object({
    id: z.number(),
    description: z.string(),
    body: z.string().nullish(),
    expectedOutput: z.string().nullish(),
    input: z.string().nullish(),
    dependencies: z.array(
      z.object({
        id: z.number(),
        description: z.string(),
        output: z.string().nullish(),
        status: taskStatusSchema,
        attachments: z.array(
          z.object({
            id: z.number(),
            path: z.string(),
            fullUrl: z.string(),
            summary: z.string().nullish(),
          })
        ),
      })
    ),
    humanAssistanceRequests: z.array(
      z.object({
        agentDump: z.unknown(),
        humanResponse: z.string().nullish(),
        id: z.number(),
        question: z.string(),
        status: z.enum(["pending", "responded"]),
        type: z.enum(["text", "project-manager-plan-review"]),
      })
    ),
  }),
  workspace: z.object({
    id: z.number(),
    goal: z.string(),
    bucket_folder: z.string(),
    agents: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        capabilities_description: z.string(),
      })
    ),
  }),
});

export const respondChatMessageActionSchema = z.object({
  type: z.literal("respond-chat-message"),
  me: z.intersection(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
    z.discriminatedUnion("isBuiltByAgentBuilder", [
      z.object({
        isBuiltByAgentBuilder: z.literal(false),
      }),
      z.object({
        isBuiltByAgentBuilder: z.literal(true),
        systemPrompt: z.string(),
      }),
    ])
  ),
  messages: z.array(
    z.object({
      author: z.enum(["agent", "user"]),
      createdAt: z.coerce.date(),
      id: z.number(),
      message: z.string(),
    })
  ),
  workspace: z.object({
    id: z.number(),
    goal: z.string(),
    bucket_folder: z.string(),
    agents: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        capabilities_description: z.string(),
      })
    ),
  }),
});

export const sendChatMessageRequestBodySchema = z.object({
  message: z.string().trim().min(1),
  agentId: z.number().optional(),
});

export const actionSchema = z.discriminatedUnion("type", [
  doTaskActionSchema,
  respondChatMessageActionSchema,
]);
