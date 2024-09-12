import {useState} from "react";
import Button from "../components/button";
import useTwitterStore from "../store/store.jsx";


export default function Login({}){

    const login = useTwitterStore((state) => state.login);
    
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    
    return(

        <div className="flex flex-col items-center h-full w-4/5 bg-white my-4 gap-2 rounded-md py-2">

            <div className="text-center font-bold text-xl">
                Welcome!
            </div>

            <div className="w-full flex flex-col items-center px-6">
                <div className="w-full text-sm">Username:</div>
                <input placeholder="Username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={12}
                    className="px-2 border-2 border-black rounded-md w-full">
                </input>
            </div>
            {error != null && 
                <div className="w-full text-center text-red-600 text-sm font-bold">Error: {error}</div>
            }

            <Button text="LOGIN" fun={() => {
                if(username == null || username == ""){
                    setError("Specify a valid name.");
                    return;
                }
                setError(null);
                setShowDisclaimer(false);
                login(username)
                }}/>

            <div className={`cool-scrollbar overflow-y-scroll px-2 text-sm w-full text-center overflow-hidden transition-height duration-300 ease-in-out ${showDisclaimer ? "h-52" : "h-0"}`}>
                Some response from this game are AI-generated.
                I, the developer, am funding myself the API cost for these requests.
                If you enjoy this game, please consider donating through itch.io a small amount to allow other players to keep playing it.
            </div>

            <Button text="DISCLAIMER" fun={() => {
                setShowDisclaimer(!showDisclaimer);
            }}/>

        </div>




    );
}