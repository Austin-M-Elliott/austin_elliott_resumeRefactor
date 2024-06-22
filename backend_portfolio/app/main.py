from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import logging
from .aces_up_main import simulate_games_with_stacks_updated

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

print("Setting up FastAPI...")
app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Defining API model...")
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
    print("Running Uvicorn...")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
