from pydantic import BaseModel, Field
from typing import List, Union, Optional, Any
from datetime import datetime

class RatingValues(BaseModel):
    new_rating: int
    raw_rating : Optional[float] = None 
    old_rating: Union[int, None] =None
    rating_change: Union[int, None] = None
    is_user_premium: bool = False
    n_solved: Union[int, None] =None
    place: int
    score: int
    class Config:
        arbitrary_types_allowed = True

class RatingData(BaseModel):
    place: str 
    resource: int
    cid: int 
    sid: int 
    name: str
    key: str
    kind: any 
    date: str
    new_rating: Union[int, None] 
    old_rating: Union[int,None] =0  
    rating_change: Union[int, None] 
    is_unrated: any  
    score: int  
    division: any
    solved: Union[None, int]
    n_problems: int
    values: RatingValues 
    class Config:
        arbitrary_types_allowed = True


class RatingInsights(BaseModel):
    pk: int
    kind: any
    host: str
    icon: str
    fields: List[str]
    data: List[RatingData]
    highest: dict
    max: int
    min: int
    class Config:
        arbitrary_types_allowed = True

class Resources(BaseModel):
    codechef_com: RatingInsights = Field(alias="codechef.com")
    codeforces_com: RatingInsights = Field(alias="codeforces.com")
    leetcode_com: RatingInsights = Field(alias="leetcode.com")
    atcoder_jp: RatingInsights = Field(alias="atcoder.jp")
    class Config:
        arbitrary_types_allowed = True  


class Ratings(BaseModel):
    resources: Resources
    created_at: Optional[datetime] = None