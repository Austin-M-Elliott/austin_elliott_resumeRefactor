from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import os
import random
from collections import defaultdict
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

# Serve static files (React build)
app.mount("/static", StaticFiles(directory="../../frontend_portfolio/build/static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('../../frontend_portfolio/build/index.html')

@app.get("/{full_path:path}")
async def read_full_path(full_path: str):
    if full_path and os.path.exists(f'../../frontend_portfolio/build/{full_path}'):
        return FileResponse(f'../../frontend_portfolio/build/{full_path}')
    return FileResponse('../../frontend_portfolio/build/index.html')

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
