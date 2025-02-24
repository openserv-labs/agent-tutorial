from fastapi import FastAPI, Request
import asyncio
import os
from dotenv import load_dotenv
from do_task import do_task
from respond_chat_message import respond_chat_message
from api import api_client

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI()

# Store active tasks
active_tasks = set()

def cleanup_task(task):
    active_tasks.discard(task)

@app.post("/")
async def handle_action(request: Request):
    try:
        # Get the action data from the request
        print("\nReceived new request")
        action = await request.json()
        print(f"Action type: {action.get('type')}")
        
        # Handle different action types asynchronously
        if action["type"] == "do-task":
            print("Processing do-task action")
            # Create and track the background task
            task = asyncio.create_task(do_task(action))
            active_tasks.add(task)
            task.add_done_callback(cleanup_task)
        elif action["type"] == "respond-chat-message":
            print("Processing respond-chat-message action")
            # Create and track the background task
            task = asyncio.create_task(respond_chat_message(action))
            active_tasks.add(task)
            task.add_done_callback(cleanup_task)
        else:
            print(f"Unknown action type: {action['type']}")
        
        # Return OK response immediately to indicate request was received
        return {"message": "OK"}
    except Exception as e:
        print(f"Error in handle_action: {str(e)}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    # Wait for all active tasks to complete
    if active_tasks:
        await asyncio.gather(*active_tasks, return_exceptions=True)
    # Close the API client session
    await api_client.close()

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "7378"))
    uvicorn.run(app, host="0.0.0.0", port=port) 