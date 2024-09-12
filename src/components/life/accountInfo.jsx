import { useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';
import useTwitterStore from "../../store/store";
import "../animations/counter.css";
import Button from "../button";
import Life from "./life";
import Health from "./health";

export default function AccountInfo({canceled, banned }) {

    let username = useTwitterStore((state) => state.username);
    let followers = useTwitterStore((state) => state.followers);
    let controversy_score = useTwitterStore((state) => state.controversy_score);

    const [displayFollowers, setDisplayFollowers] = useState(0);

    useEffect( () => {
        if(followers == null){
            setDisplayFollowers(0);
            return;
        }
        setDisplayFollowers(followers);
    }, [followers]);


    return (
        <div className="h-full flex flex-col pb-2">
            <div className="h-4/6 flex flex-row justify-between ">
                    <div className="flex flex-row">
                        <Icon icon="ic:sharp-account-circle" className="size-full w-12"/>
                        <div className="flex flex-col h-full pb-2 text-sm text-ellipsis">
                            <div className="font-bold h-1/2">{username}</div>
                            <div className="text-gray-500 h-1/2">@{username}</div>
                        </div>
                    </div>
                    <div className="max-w-12 h-full flex flex-col justify-center pt-2">
                        <Health />
                    </div>
                    
                    <div className="flex flex-col items-center text-gray-800/90 overflow-hidden pt-1">
                        <Icon icon="material-symbols:groups-rounded" className="size-full scale-150"/>
                        <div className="flex flex-row gap-2 overflow-hidden h-full text-xs">
                            <div 
                                key={displayFollowers}
                                className="inline-block animate-counter text-inherit">
                                {displayFollowers.toLocaleString()}
                            </div>
                            <div> Followers</div>
                        </div>
                    </div>
            </div>
            <Life controversial={controversy_score} />
        </div>
    );
}
