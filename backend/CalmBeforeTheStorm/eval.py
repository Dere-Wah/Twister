import random

from openai import OpenAI
import json

from models import TweetEvaluationResponse

client = OpenAI(api_key='')


async def evaluate(text: str) -> any:
    response = client.moderations.create(input=text)
    output = response.results[0].to_json()
    return json.loads(output)


def determine_response_type(controversy_score: int, deleted: bool):
    if controversy_score < 20:
        return 1, random.choice(["rational", "excited", "happy"])
    elif 20 <= controversy_score < 40:
        return random.randint(1, 2), random.choice(["sensible", "rational"])
    elif 40 <= controversy_score < 60:
        return random.randint(1, 2), random.choice(["edgy", "sensible", "skeptical"])
    elif 60 <= controversy_score < 80:
        text = random.choice(["rage/angry", "edgy", "gaslighting"])
        if not deleted:
            text = "if it's an apology 1 comment forgiving, others " + text
        return random.randint(2, 3), text
    elif 80 <= controversy_score < 90:
        text = random.choice(["rage/angry", "deluded", "canceling", "spreading more false rumors"])
        if not deleted:
            text = "if it's an apology 1 comment forgiving, others " + text
        return random.randint(3, 3), text
    else:
        return random.randint(3, 3), random.choice(["canceling and enraged and offended"])


# Helper function to generate text for deleted tweets
def handle_deleted_tweet(deleted: bool, response_type: str):
    if deleted:
        return (f"It should be noted that the tweet has been deleted by the post author. "
                f"In this case, it should be considered even more controversial. "
                f"Comments should be {response_type}, emphasizing the fact that the author is trying to hide it.")
    return ""


# Helper function to construct the prompt based on controversy score
def construct_prompt(old_tweets: str, deleted_text: str, users_amount: int, response_type: str):
    tweet_info = f"The list of the last tweets from this author is the following: {old_tweets}"

    base_prompt = (f"Given the following tweet, determine if it is bannable or controversial, "
                   f"from 0 to 100%. Also imitate {users_amount} comments that this tweet might have, "
                   f"pretending to be a {response_type} user reacting. Give the users fictional names. "
                   f"{tweet_info}. {deleted_text}")

    return base_prompt


# Main function to generate comment and handle different controversy scores
async def generate_comment(author: str, body: str, deleted: bool, old_tweets: str, controversy_score: int) -> TweetEvaluationResponse:

    # Step 1: Determine user amount and response type based on controversy score
    users_amount, response_type = determine_response_type(controversy_score, deleted)

    # Step 2: Handle the case of a deleted tweet
    deleted_text = handle_deleted_tweet(deleted, response_type)

    # Step 3: Construct the appropriate prompt based on the controversy score range
    prompt = construct_prompt(old_tweets, deleted_text, users_amount, response_type)

    if not deleted and random.randint(0, 100) <= 40:
        prompt = prompt + ("If the post is an apology, ACCEPT the APOLOGY! So lower the controversial/banned value and"
                           "post understanding and forgiving comments.")

    # Step 4: Call the model with the constructed prompt
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini-2024-07-18",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"{author}: {body}"},
        ],
        response_format=TweetEvaluationResponse,
    )

    # Parse and return the result
    res = completion.choices[0].message.parsed
    return res

