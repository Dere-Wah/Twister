import { useEffect, useState } from "react";
import Button from "../button";
import Life from "../life/life";
import { Icon } from '@iconify/react';
import TweetElement from "../../classes/TweetElement";
import useTwitterStore from "../../store/store";


/**
 * 
 * @param {TweetElement} tweet - the Tweet
 * @param {boolean} new_tweet - accept input for the tweet.
 * @returns 
 */
export default function Tweet({tweet, new_tweet, can_edit}){

    const generateImageArray = (numImages) => {
        const images = [];
        for (let i = 1; i <= numImages; i++) {
          images.push(`../src/assets/propics/image${i}.png`);
        }
        return images;
      };
      
      // Define the number of images you want
      const images = generateImageArray(15);

    if(can_edit == null && !new_tweet){
        can_edit = tweet.can_edit;
    }

    const [length, setLength] = useState(0);
    const [content, setContent] = useState("");
    const [showReplies, setShowReplies] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const username = !new_tweet ? tweet.author : useTwitterStore((state) => state.username);
    let followers = useTwitterStore((state) => state.followers);
    const publish_tweet = useTwitterStore((state) => state.createTweet);

    const refresh = useTwitterStore((state) => state.refresh);
    const tweets = useTwitterStore((state) => state.tweets);
    const controversy_score = useTwitterStore((state) => state.controversy_score);
    const setControversy = useTwitterStore((state) => state.setControversy);

    const game_over = useTwitterStore((state) => state.game_over);
    const setGameOver = useTwitterStore((state) => state.setGameOver);

    const addBanned = useTwitterStore((state) => state.addBanned);
    const addFws = useTwitterStore((state) => state.addFollowers);

    function gather_tweets() {
        const tweetBodies = tweets.slice(-2).map(tweet => tweet.body);
        return tweetBodies;
    }

    // Simple hashing function to turn text into a number (deterministic)
    function hashStringToIndex(input, arrayLength) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash) % arrayLength; // Ensure non-negative index
    }

    

    if(!new_tweet && tweet.deleted != deleted){
        setDeleted(tweet.deleted);
    }

    if(!new_tweet){
        useEffect(() => {
            console.log("refreshing...");
        }, [tweet.key]);
    }

    async function evaluate(username, content){
        let tweet = new TweetElement(username, content);
        publish_tweet(tweet);
        setLength(0);
        setContent("");
        setDisabled(true);
        await tweet.eval(gather_tweets(), controversy_score);
        setDisabled(false);

        tweet.followers = Math.floor(((tweet.followers-10) / 100)*followers)
        setControversy(tweet.controversy_score)
        console.log(tweet.controversy_score);
        console.log(controversy_score);
        if((tweet.controversy_score >= 90 && game_over >= 1) ||
            (tweet.controversy_score >= 70 && game_over < 1)){
            setGameOver(game_over+1);
        }else if (tweet.controversy_score <= 70){
            setGameOver(Math.max(game_over-1, -2));
        }
        console.log(game_over);
        const mult = game_over <= -2 ? 8 : 1;
        if(tweet.followers <= 0){
            tweet.followers = Math.max(tweet.followers * mult, -followers);
        }
        
        addFws(tweet.followers);

        if(tweet.banned >= 90){
            addBanned(1);
        }else{
            addBanned(-1);
        }
        refresh();
    }

    async function delete_tweet(){
        setDeleted(true);
        await tweet.delete(gather_tweets(), controversy_score);
        setControversy(tweet.controversy_score)
        console.log(controversy_score);
        if(tweet.controversy_score >= 90){
            setGameOver(game_over+1);
        }else if (tweet.controversy_score <= 50){
            setGameOver(Math.max(game_over-1, -3));
        }
        addBanned(-1);
        refresh();
    }


    return (
        <div className={`flex flex-col w-full items-start ${!deleted ? "bg-white" : "bg-gradient-to-b from-white to-red-50"} border border-black/20 rounded-sm shadow-xl`}>
            <div className="flex flex-row w-full items-start">
                <div className="min-w-8">
                    <Icon icon="ic:sharp-account-circle" className="size-full"/>
                </div>
                <div className="w-full flex flex-col text-sm relative">
                    <div className="w-full flex flex-row gap-2 px-2">
                        <div className="font-bold">
                            {username}
                        </div>
                        <div className="font-normal text-gray-500 overflow-hidden text-ellipsis">
                            @{username}
                        </div>
                        {!new_tweet && tweet.followers != null && 
                            <div className=" absolute right-1 bg-white rounded-full top-1 z-10 shadow-sm shadow-black">
                                {tweet.followers >= 0 &&
                                    <div className="bg-green-700/20 text-[10px] rounded-full px-0.5 border border-green-600 text-center">+{tweet.followers.toLocaleString()} &#128101;</div>
                                }
                                {tweet.followers < 0 &&
                                    <div className="bg-red-700/20 text-[10px]  rounded-full px-0.5 border border-red-600 text-center">{tweet.followers.toLocaleString()} &#128101;</div>
                                }

                            </div>
                        }
                    </div>
                    {!new_tweet && tweet.image != null &&
                        <div className="relative w-full pe-4 pt-1">
                            <div className="absolute right-5 bottom-2 bg-black/80 text-white px-1 rounded-lg">11:00</div>
                            <img src={tweet.image} className="rounded-xl border-2 border-black"/>
                        </div>
                    }
                    {!new_tweet && 
                        <div className={`text-sm h-full px-2 py-1`}>
                            {deleted && <span className="italic text-xs">This tweet has been deleted...</span>}
                            {!deleted && <span>{tweet.body}</span>}
                        </div>
                    }
                    {new_tweet && 
                        <div className="flex flex-col w-full justify-center">
                            <textarea 
                            onChange={(e) => {setContent(e.target.value); setLength(e.target.value.length)}}
                            value={content}
                            disabled={disabled}
                            maxLength={140}
                            placeholder="Type your tweet..."
                            className="text-sm h-32 px-2 me-2 resize-none"/>
                            <div className="w-full justify-between flex flex-row py-1 px-1">
                                <div className="text-xs">{length}/140</div>
                                {length >= 8 && 
                                    <Button text="Tweet" fun={async () => {evaluate(username, content)}}/>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="w-full flex flex-row justify-between px-8 text-gray-500/50 py-1 border-y border-inherit ">
                <Icon icon="mdi:chat-outline" className="hover:text-dodger-blue-400 hover:cursor-pointer"/>
                <Icon icon="material-symbols:sync-outline" className="hover:text-dodger-blue-400 hover:cursor-pointer"/>
                <Icon icon="material-symbols:bookmark-outline" className="hover:text-dodger-blue-400 hover:cursor-pointer"/>
                {!new_tweet && !deleted && can_edit && 
                <Icon onClick={async () => {await delete_tweet()}} icon="material-symbols:delete-outline" className="hover:text-dodger-blue-400 hover:cursor-pointer"/>
                }
            </div>
            {!new_tweet && (tweet.controversial != null || tweet.banned != null) &&
                <div className="w-full h-[45px] flex-row flex gap-1 px-1 pb-1">
                    <Life controversial={tweet.controversial} banned={tweet.banned}/>
                </div>
            }


            {!new_tweet && tweet.replies.length > 0 && showReplies &&
                <div className="flex flex-col w-full justify-start">
                    {tweet.replies.map((reply, index) =>{
                            const imageIndex = hashStringToIndex(reply.author, images.length);
                            const imageSrc = images[imageIndex];
                            // Render a Tweet component for each tweet in the array
                            // <Icon icon="ic:sharp-account-circle" className="min-w-8 size-8 mx-1"/>

                            return(
                                <div key={index} 
                                className="w-full flex flex-row py-2 border-y border-black/20">
                                    <img src={imageSrc} alt="Profile" className="min-w-8 size-8 mx-1 rounded-full" />
                                    <div className="flex flex-col">
                                        <div className="text-xs text-gray-500"><span className="font-bold text-black">{reply.author}</span> replied:</div>
                                        <div className="text-xs pe-1">{reply.body}</div>
                                    </div>
                                </div>
                        )})}
                </div>
            }

            {!new_tweet && tweet.replies.length > 0 && 
            <button onClick={() => {setShowReplies(!showReplies)}} className="text-xs px-1 text-dodger-blue-400 w-full text-center pb-1">{showReplies ? "Hide" : "Show"} {tweet.replies.length} {tweet.replies.length == 1 ? "Reply" : "Replies"}...</button>}
        </div>
    );
}