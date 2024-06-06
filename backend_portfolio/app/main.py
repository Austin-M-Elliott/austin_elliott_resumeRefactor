from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import os
from .aces_up_main import (
    create_deck, play_game_with_stacks_updated, 
    simulate_games_with_stacks_updated
)

app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the absolute path of the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
static_dir = os.path.join(current_dir, '../../frontend_portfolio/build/static')

# Serve static files (React build)
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")
else:
    raise RuntimeError(f"Static directory '{static_dir}' does not exist")

# Root route serving the React index.html
@app.get("/")
async def read_index():
    return FileResponse(os.path.join(current_dir, '../../frontend_portfolio/build/index.html'))

# Catch-all route to serve other static files or fallback to index.html
@app.get("/{full_path:path}")
async def read_full_path(full_path: str):
    file_path = os.path.join(current_dir, f'../../frontend_portfolio/build/{full_path}')
    if full_path and os.path.exists(file_path):
        return FileResponse(file_path)
    return FileResponse(os.path.join(current_dir, '../../frontend_portfolio/build/index.html'))

# API model and endpoint
class SimulationRequest(BaseModel):
    num_simulations: int

@app.post("/simulate/")
def simulate_games(request: SimulationRequest) -> Dict[int, float]:
    try:
        outcomes_board, _ = simulate_games_with_stacks_updated(request.num_simulations)
        probabilities_board = {k: v / request.num_simulations for k, v in outcomes_board.items()}
        sorted_probabilities = dict(sorted(probabilities_board.items()))
        return sorted_probabilities
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
