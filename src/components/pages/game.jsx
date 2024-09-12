import Tweet from "../tweet/tweet";
import Button from "../button";
import useTwitterStore from "../../store/store";
import {useState} from "react";
import AccountInfo from "../life/accountInfo";
import TweetElement from "../../classes/TweetElement";
import Info from "../tweet/info";
import Health from "../life/health";

export default function Game({}){

    let tweets = useTwitterStore((state) => state.tweets);

    let refreshSeed = useTwitterStore((state) => state.refreshSeed);
    const username = useTwitterStore((state) => state.username);
    const game_over = useTwitterStore((state) => state.game_over);
    const banned = useTwitterStore((state) => state.banned);
    let followers = useTwitterStore((state) => state.followers);
    let controversy_score = useTwitterStore((state) => state.controversy_score);
    const youtubed = useTwitterStore((state) => state.youtubed);
    const setYoutubed = useTwitterStore((state) => state.setYoutubed);
    const publish_tweet = useTwitterStore((state) => state.createTweet);
    const resetGame = useTwitterStore((state) => state.resetGame);

    const pdffed = useTwitterStore((state) => state.pdffed);
    const setPdffed = useTwitterStore((state) => state.setPdffed);
    const addFws = useTwitterStore((state) => state.addFollowers);

    if(game_over >= 3 || banned >= 3 || followers <= 0){
        return(
            <div className="w-full">
                <div className="h-[60px] w-full px-4 shadow-xl">
                    <AccountInfo/>
                </div>
                <div className="group flex flex-col h-full gap-2 py-2 max-h-[350px] overflow-scroll overflow-x-hidden bg-red-600/0 hover:bg-red-900/90 transition-colors duration-700 ease cool-scrollbar">
                    <div className="w-full text-center font-extrabold text-3xl text-white bg-red-950">GAME OVER!</div>
                    {game_over >= 3 && 
                        <div className="grid w-full font-extrabold text-center place-items-center bg-dodger-blue-700 text-white transition-height ease duration-200 h-6 hover:h-12 hover:text-xl">
                            CANCELLED
                        </div>
                    }
                    {banned >= 3 && 
                        <div className="grid w-full font-extrabold text-center place-items-center bg-red-700 text-white transition-height ease duration-200 h-6 hover:h-12 hover:text-xl">
                            BANNED
                        </div>
                    }
                    {followers <= 0 && 
                        <div className="grid w-full font-extrabold text-center place-items-center bg-black text-white transition-height ease duration-200 h-6 hover:h-12 hover:text-xl">
                            FORGOTTEN
                        </div>
                    }
                    <div className="flex flex-col w-full px-2 gap-1">
                        <div className="w-full text-sm text-center text-black group-hover:text-white duration-75">
                            Your career as a content creator has come to an end.
                            This tweet specifically was the last straw:
                        </div>

                        <Tweet tweet={tweets[tweets.length - 1]} can_edit={false} />
                    </div>
                    
                </div>
                <div className="w-full flex flex-col items-center p-4 scale-150">
                    <Button text="Play Again" fun={() => resetGame()}/>
                </div>
            </div>
            
        )
    }

    if(controversy_score >= 85 && Math.random() * 100 <= 30 && !youtubed){
        setYoutubed();
        let vid = new TweetElement("penguinz0", `${username} situation is crazy`)
        vid.image = "./assets/miniature.png";
        vid.can_edit = false;
        vid.followers = Math.floor(followers * -1 * 0.50)
        addFws(vid.followers);
        vid.replies = [{"author": "Gamerboy123", "body": `Glad someone is addressing ${username}.`}, {"author": "Waffle", "body": "Dude is gonna be canceled soon..."}]
        
        publish_tweet(vid);
    }
    
    if(controversy_score >= 85 && Math.random() * 100 <= 30 && !pdffed){
        setPdffed();
        let tw = new TweetElement("Stacy101", `Not staying silent anymore. See the google doc for all the allegations against them. ${username}_allegations.pdf`)
        tw.can_edit = false;
        tw.replies = [{"author": "Kimst4r", "body": `@${username} I hope your carreer ends soon.`}, {"author": "MouseClicker", "body": "Has any of these allegations been confirmed? How can we know you are saying thhe truth."}]
        publish_tweet(tw);
    }

    return(
            <div className="w-full">
                <div className="h-[60px] w-full px-4 shadow-xl">
                    <AccountInfo/>
                </div>
                <div className="cool-scrollbar w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden gap-2 px-4 py-4 max-h-[350px] ">
                    {game_over >= 2 && 
                        <Info message={"You are close to being canceled! Consider apologizing!"}/>
                    }
                    {banned >= 2 && 
                        <Info message={"You are posting bannable stuff! Keep it down or you'll be banned!"} negative/>
                    }
                    {game_over <= -1 &&
                        <Info message={"You are not being controversial enough. Be controversial or people will forget about you!"} negative/>
                    }
                    <Tweet new_tweet={true}/>
                    <div className="w-full flex flex-col-reverse gap-2">
                        {tweets.map((tweet, index) => (
                            // Render a Tweet component for each tweet in the array
                            <Tweet key={index} tweet={tweet} />
                        ))}
                    </div>
                </div>
            </div>
    );
}