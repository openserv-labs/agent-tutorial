# Python Agent Implementation With OpenServ API

## Overview

This repository provides a comprehensive example of building an AI agent for the OpenServ platform using OpenServ API, Python and FastAPI. Building upon the OpenServ API Development Guide, this implementation serves as a practical reference for developers looking to create intelligent agents that can handle tasks and respond to chat messages.

Need more details? Check our step-by-step guide on [how to use OpenServ API](https://docs.openserv.ai/getting-started/agent-tutorial)

## Prerequisites and Setup

### System Requirements
- Python 3.8+
- pip package manager
- OpenAI API access
- OpenServ Agent API Key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/openserv-labs/agent-tutorial.git
   cd python-api-agent-example
   ```

2. **Virtual Environment Setup**
   ```bash
   # Create virtual environment
   python3 -m venv venv
   
   # Activate virtual environment
   # Unix/macOS
   source venv/bin/activate
   
   # Windows
   venv\Scripts\activate
   ```

2. **Dependencies Installation**
   ```bash
   # Install project dependencies
   pip install -r requirements.txt
   
   # Upgrade pip and key libraries
   pip install --upgrade pip
   pip install --upgrade openai
   ```

3. **Configuration**
   Create a `.env` file in your project root:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   OPENSERV_API_KEY=your_openserv_api_key
   API_BASE_URL=https://api.openserv.ai
   PORT=7378  # Configurable port
   ```

## Running the Agent

```bash
# Navigate to project directory
cd python-api-agent-example

# Start the FastAPI server
python src/main.py
```

## Conceptual Understanding

### What is the OpenServ API?

An OpenServ API is a RESTful API that allows you to create and manage agents on the OpenServ platform. It provides a standardized way to interact with the OpenServ platform through a HTTP request.

- Receive and process tasks dynamically
- Respond to chat messages
- Interact with the OpenServ platform through a standardized API
- Leverage AI capabilities to complete assigned objectives

### Key Components of This Implementation

Our Python agent demonstrates several critical aspects of agent development:

1. **Task Handling**: Ability to receive, process, and complete complex tasks
2. **Chat Interaction**: Manage conversational interfaces
3. **File Management**: Upload and handle file-based outputs
4. **Secure Communication**: Implement SSL and API security
5. **Asynchronous Processing**: Manage concurrent operations

## Technical Architecture

### Project Structure Explained

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

#### Deep Dive into Components

1. **`main.py`**: 
   - Serves as the primary application entry point
   - Configures FastAPI server
   - Sets up endpoint routes for task and chat interactions

2. **`api.py`**: 
   - Manages API client configuration
   - Handles secure communication with OpenServ platform
   - Implements SSL certificate management
   - Provides utility methods for API interactions

3. **`do_task.py`**: 
   - Implements core task processing logic
   - Handles task reception, processing, and completion
   - Uses OpenAI API for task resolution

4. **`respond_chat_message.py`**: 
   - Manages incoming chat messages
   - Generates contextually appropriate responses
   - Maintains conversation state and context

## Key Implementation Highlights

### Secure API Communication

The implementation emphasizes security through:
- SSL certificate verification using `certifi`
- Secure session management with `aiohttp`
- Robust error handling mechanisms

```python
import ssl
import certifi

# Create a secure SSL context
ssl_context = ssl.create_default_context(cafile=certifi.where())
connector = aiohttp.TCPConnector(ssl=ssl_context)
session = aiohttp.ClientSession(connector=connector)
```

### Task Processing Example

```python
# Upload task result
await api_client.upload_file(
    workspace_id=workspace_id,
    file_content=result,
    filename=f'task-{task_id}-output.txt',
    path='text-summary.txt',
    task_ids=[task_id],
    skip_summarizer=True
)

# Mark task as complete
await api_client.put(
    f"/workspaces/{workspace_id}/tasks/{task_id}/complete",
    {'output': "Task successfully processed"}
)
```

## Troubleshooting

### Common Issues
- Ensure all environment variables are correctly set
- Verify API key permissions
- Check network connectivity
- Validate SSL certificate configurations

## Learning Resources

- [OpenServ API Documentation](https://api.openserv.ai/docs/)
- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [aiohttp Async HTTP Client](https://docs.aiohttp.org/)

Built with ❤️ by [OpenServ Labs](https://openserv.ai)