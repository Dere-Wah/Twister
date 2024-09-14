import math

from fastapi import FastAPI, HTTPException
import random
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from eval import evaluate, generate_comment
from models import TweetEvaluationResponse, TweetEvaluationRequest, Reply
import time

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]

app = FastAPI(middleware=middleware)


# Endpoint to evaluate the tweet
@app.post("/eval", response_model=TweetEvaluationResponse)
async def evaluate_tweet(request: TweetEvaluationRequest):
    if len(request.body) > 200:
        raise HTTPException(status_code=400, detail="Invalid request.")

    if request.controversy_score <= -10:
        res = await evaluate(request.body)
        if not res["flagged"]:
            tw = TweetEvaluationResponse(banned=0, controversial=False, replies=[],
                                         percentage_of_followers_gained_or_lost=0, controversy_score=0)
            replies = tw.replies = [
                {"author": "OldFan", "body": "Wait, why do I follow you? I don't remember ever following you..."},
                {"author": "ConfusedUser",
                 "body": "You never post anything interesting. Why am I still following you?"},
                {"author": "LostFollower",
                 "body": "I honestly forgot why I followed you in the first place. Unfollowing soon."},
                {"author": "BoredScroll", "body": "Your posts are so boring lately. Why did I even follow you?"},
                {"author": "AccidentalFollower",
                 "body": "Did I follow you by mistake? Because I don’t remember ever doing it."},
                {"author": "RandomGuy",
                 "body": "I’m trying to figure out why I still follow you... not seeing any good reason."},
                {"author": "UncertainFan",
                 "body": "When did your content get so dull? I really need to reconsider this follow."},
                {"author": "QuestionableFollow",
                 "body": "Remind me why I follow you? Your posts are always irrelevant to me."},
                {"author": "LostInterest",
                 "body": "Not sure why you're still on my timeline. Time for me to unfollow, I think."},
                {"author": "ConfusedFollower",
                 "body": "Do I even like any of your posts? I seriously can’t remember why I followed."}
            ]
            tw.replies = [Reply.parse_obj(random.choice(replies))]
            res = res["category_scores"]
            tw.controversial = math.floor(max(res["hate"], res["harassment"], res["sexual"]) * 100)
            tw.banned = math.floor(max(res["violence"], res["self-harm"]) * 100)
            tw.percentage_of_followers_gained_or_lost = random.randint(-20, 20)
            tw.controversy_score = request.controversy_score
            return tw

    old = ""
    if len(request.old_tweets) > 0:
        old = "|".join(request.old_tweets)

    response = await generate_comment(request.author, request.body, request.deleted, old, request.controversy_score)
    request.controversy_score -= math.floor(request.controversy_score * 0.2)
    if response.controversy_score <= request.controversy_score:
        response.controversy_score = request.controversy_score

    return response
