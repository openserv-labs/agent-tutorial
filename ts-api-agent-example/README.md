# TypeScript Agent Example With OpenServ API

This is a reference implementation of an OpenServ API agent using TypeScript. It demonstrates how to create an agent that can handle tasks and respond to chat messages.

## Features

- Task handling with OpenAI API
- Chat message responses
- File upload functionality
- Error handling and reporting
- Background task management

## Project Structure

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

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- OpenServ API key

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your credentials:
```env
OPENAI_API_KEY=your_openai_api_key
OPENSERV_API_KEY=your_openserv_api_key
API_BASE_URL=https://api.openserv.ai
PORT=7378  # Optional, defaults to 3005
```
  
3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
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

Comprehensive error handling:
- API request error handling
- Task processing error reporting
- Background task management
- Session cleanup

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `OPENSERV_API_KEY` | Your OpenServ API key | Yes |
| `API_BASE_URL` | OpenServ API base URL | Yes |
| `PORT` | Server port (default: 7378) | No |

## Development

To add new features or modify the agent:

1. Update types in `lib/interfaces.ts`
2. Implement functionality in `src/`
3. Use the API client from `lib/api.ts`
4. Build and test your changes

## Contributing

Feel free to submit issues and enhancement requests! 