from fastapi import APIRouter, BackgroundTasks
from fastapi.responses import JSONResponse
from src.api.api import Ratings
from src.schedule import update_record, reload_portfolio
router = APIRouter()

@router.get("/healthcheck")
async def read_root():
    return {"message": "Datagen is running up"}

@router.post("/update_ratings")
async def update_ratings(background_tasks: BackgroundTasks):
    ratings =Ratings()
    ratings.update_ratings()
    return JSONResponse(content= {"message": "successfully data updated in firestore"}, status_code=200)
