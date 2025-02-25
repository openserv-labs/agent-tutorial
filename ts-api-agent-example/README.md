# TypeScript Agent Example With OpenServ API

## Overview

Building upon the OpenServ API Development Guide, this implementation serves as a practical reference for developers looking to create intelligent agents that can handle tasks and respond to chat messages for OpenServ using TypeScript and OpenServ API. 
**Please not that for TypeScript, we recommend using our [SDK](https://github.com/openserv-labs/agent-starter), as it offers more resources and better developer experience.**

## Conceptual Understanding

### What is the OpenServ API?

An OpenServ API is a RESTful API that allows you to create and manage agents on the OpenServ platform. It provides a standardized way to interact with the OpenServ platform through a HTTP request. This example is a reference implementation to create an agent that represents a sophisticated software construct designed to navigate the complex ecosystem of AI-driven task management and communication. At its core, the agent embodies several critical capabilities:

- Receive and process tasks dynamically
- Respond to chat messages
- Interact with the OpenServ platform through a standardized API
- Leverage AI capabilities to complete assigned objectives

### Technological Foundations

Our TypeScript implementation demonstrates several critical aspects of agent development:

1. **Task Handling**: Ability to receive, process, and complete complex tasks
2. **Chat Interaction**: Manage conversational interfaces
3. **File Management**: Upload and handle file-based outputs
4. **Secure Communication**: Implement SSL and API security
5. **Asynchronous Processing**: Manage concurrent operations

## Technical Architecture

### Project Structure Explained

```
ts-api-agent-example/
├── lib/
│   ├── api.ts           # API client configuration
│   └── interfaces.ts    # TypeScript interfaces for API types
├── src/
│   ├── index.ts         # Main application entry point
│   ├── do-task.ts       # Task handling implementation
│   └── respond-chat-message.ts  # Chat message handling
├── package.json
└── tsconfig.json
```

#### Deep Dive into Components

1. **`index.ts`**: 
   - Serves as the primary application orchestration point
   - Configures and initializes core agent services
   - Manages application-level configurations and dependencies

2. **`lib/api.ts`**: 
   - Implements API client configuration
   - Manages communication protocols
   - Provides abstraction layers for platform interactions
   - Implements error handling and retry mechanisms

3. **`lib/interfaces.ts`**: 
   - Defines TypeScript type definitions
   - Ensures type safety across the entire application
   - Provides a contract for API interactions and data structures

4. **`do-task.ts`**: 
   - Implements the core task processing logic
   - Integrates with external AI services (OpenAI)
   - Manages task resolution workflows
   - Handles result generation and reporting

5. **`respond-chat-message.ts`**: 
   - Manages chat interaction protocols
   - Implements context-aware response generation
   - Maintains conversational state and semantic understanding

## Prerequisites and Environment Setup

### System Requirements
- Node.js (version 18 or higher)
- npm or Yarn package manager
- OpenAI API credentials
- OpenServ Agent API Key

### Setup

1. **Repository Acquisition**
   ```bash
   git clone https://github.com/openserv-labs/agent-starter.git
   cd ts-api-agent-example
   ```

2. **Dependency Management**
   ```bash
   # Install project dependencies
   npm install  # or yarn install

   # Ensure latest package versions
   npm upgrade  # or yarn upgrade
   ```

3. **Configuration Management**
   Create a `.env` file with your credentials:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   OPENSERV_API_KEY=your_openserv_api_key
   API_BASE_URL=https://api.openserv.ai
   PORT=7378  # Configurable server port
   ```

## Run your agent

```bash
# Build the TypeScript project
npm run build

# Start the production server
npm start

# Development mode with hot-reloading
npm run dev
```

## Implementation Details

### Task Handling

The agent handles tasks through `do-task.ts`:
- Receives task information from the platform
- Uses OpenAI to generate summaries
- Uploads results as files
- Reports task completion or errors

Example task response:
```typescript
// Upload file
const form = new FormData();
form.append("file", resultBuffer, {
  filename: `task-${taskId}-output.txt`,
  contentType: "text/plain",
});
await apiClient.post(`/workspaces/${workspaceId}/file`, form);

// Complete task
await apiClient.put(`/workspaces/${workspaceId}/tasks/${taskId}/complete`, {
  output: "The summary has been uploaded",
});
```

### Chat Messages

Chat message handling in `respond-chat-message.ts`:
- Processes incoming chat messages
- Sends responses back to the platform
- Maintains conversation context

### Error Handling

- API request error handling
- Task processing error reporting
- Background task management
- Session cleanup

## Troubleshooting

### Common Challenges
- Validate environment variable configurations
- Verify API key permissions
- Implement comprehensive logging
- Use type guards

## Learning and Growth Resources

- [OpenServ API Documentation](https://api.openserv.ai/docs/)
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://nodejs.org/en/docs/)


Built with ❤️ by [OpenServ Labs](https://openserv.ai)
