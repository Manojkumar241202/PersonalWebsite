import requests
from fastapi import HTTPException
from src.api import data_models
from firebase_admin import firestore
from traceback import print_exc
from datetime import datetime, timezone


class Ratings:
    def __init__(self):
        db = firestore.client()
        self.collection_ref = db.collection('ratings')

    def update_ratings(self):
        clist_response = requests.get('https://clist.by/coder/manojkumar2412/ratings/')
        if clist_response.status_code !=200:
            raise HTTPException(status_code= 500, detail=f"Got status from the clist: {clist_response.status_code}")
        
        try:
            clist_response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"error: {clist_response.text}")
        try:
            clist_response =  clist_response.json()["data"]

            for platform in clist_response["resources"].values():
                platform["data"]= platform["data"][0]
            
            clist_response["created_at"] = datetime.now(timezone.utc)
            ratings = data_models.Ratings(**clist_response)
        except Exception as e:
            print_exc()
            raise HTTPException(status_code=500, detail="Pydantic data model error")
        try:
            prev_ratings = self.collection_ref.document('ratings').get()
            self.collection_ref.document("prev_record").set(prev_ratings.to_dict())
            self.collection_ref.document("ratings").set(ratings.model_dump(by_alias=True))
        except Exception as e:
            print_exc()
            raise HTTPException(status_code=500, detail="firestore error")
        return True
        

