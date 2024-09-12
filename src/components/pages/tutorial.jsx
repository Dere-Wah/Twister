import Tweet from "../tweet/tweet";
import Button from "../button";
import useTwitterStore from "../../store/store";
import {useState} from "react";
import TweetElement from "../../classes/TweetElement";

export default function Tutorial({}){


	let completeTutorial = useTwitterStore((state) => state.completeTutorial);
    let username = useTwitterStore((state) => state.username);
	let tutorial_tweet = new TweetElement(username, "I made a severe and continuous lapse in my judgement, and I don’t expect to be forgiven. I’m simply here to apologize.");
	tutorial_tweet.controversial = 90
	tutorial_tweet.banned = 90
    tutorial_tweet.can_edit = false;
    tutorial_tweet.followers = -100000;

    return(
        <div className="w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden gap-2 px-4 pb-4 cool-scrollbar">
                    <div className="w-full text-center font-bold">
                        Welcome to the tutorial!
                    </div>
                    <div className="font-medium text-xs text-center px-4">
                        In this game you'll simulate the average content creator experience.

                        Your goal is to post as many controversial tweets as possible, without getting canceled or banned.
                        
                        The more "controversial" you are, the more attention you'll get, but the riskier it will be.
                    </div>
            <Tweet tweet={tutorial_tweet}/>

            <Button text="PROCEED" fun={() => {completeTutorial()}}/>
        </div>
    );
}