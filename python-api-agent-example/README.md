# Python Agent Example With OpenServ API

This is a reference implementation of an OpenServ API agent using Python and FastAPI. It demonstrates how to create an agent that can handle tasks and respond to chat messages.

## Features

- Task handling with OpenAI integration
- Chat message responses
- File upload functionality
- Error handling and reporting
- Asynchronous task management
- SSL certificate handling with certifi

## Project Structure

```
python-api-agent-example/
├── src/
│   ├── __init__.py          # Package initialization
│   ├── main.py              # FastAPI application entry point
│   ├── api.py               # API client configuration
│   ├── do_task.py           # Task handling implementation
│   └── respond_chat_message.py  # Chat message handling
└── requirements.txt         # Python dependencies
```

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- OpenAI API key
- OpenServ API key

## Setup

1. Create and activate a virtual environment (recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your credentials:
```env
OPENAI_API_KEY=your_openai_api_key
OPENSERV_API_KEY=your_openserv_api_key
API_BASE_URL=https://api.openserv.ai
PORT=7378  # Optional, defaults to 7378
```

## Running the Application

Start the FastAPI server:
```bash
cd python-api-agent-example
PYTHONPATH=$PYTHONPATH:. python3 -m uvicorn src.main:app --reload --port 7378
```

## Implementation Details

### Task Handling

The agent handles tasks through `do_task.py`:
- Receives task information from the platform
- Uses OpenAI to generate summaries
- Uploads results as files
- Reports task completion or errors

Example task response:
```python
# Upload file
await api_client.upload_file(
    workspace_id=workspace_id,
    file_content=result,
    filename=f'task-{task_id}-output.txt',
    path='text-summary.txt',
    task_ids=[task_id],
    skip_summarizer=True
)

# Complete task
await api_client.put(
    f"/workspaces/{workspace_id}/tasks/{task_id}/complete",
    {'output': "The summary has been uploaded"}
)
```

### Chat Messages

Chat message handling in `respond_chat_message.py`:
- Processes incoming chat messages
- Sends responses back to the platform
- Maintains conversation context

### API Client Features

The `api.py` client includes:
- SSL certificate handling with certifi
- Session management with aiohttp
- File upload utilities
- Error handling
- Response parsing

### SSL Certificate Handling

The application uses `certifi` for proper SSL certificate verification:
```python
import ssl
import certifi

ssl_context = ssl.create_default_context(cafile=certifi.where())
connector = aiohttp.TCPConnector(ssl=ssl_context)
session = aiohttp.ClientSession(connector=connector)
```

This ensures secure communication with the OpenServ API while maintaining compatibility across different platforms.

### Error Handling

Comprehensive error handling:
- SSL certificate verification
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

The application uses:
- FastAPI for the web framework
- aiohttp for async HTTP requests
- OpenAI's Python client
- Asynchronous task handling
- certifi for SSL certificate verification

## Contributing

Feel free to submit issues and enhancement requests! 