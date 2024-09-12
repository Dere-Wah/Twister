from typing import List

from pydantic import BaseModel


class Reply(BaseModel):
    author: str
    body: str


class TweetEvaluationRequest(BaseModel):
    author: str
    body: str
    deleted: bool
    replies: List[Reply]
    old_tweets: List[str]
    controversy_score: int


# Define the response model
class TweetEvaluationResponse(BaseModel):
    banned: float
    controversial: float
    replies: List[Reply]
    percentage_of_followers_gained_or_lost: int
    controversy_score: int
