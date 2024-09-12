import Login from "../components/login.jsx";
import useTwitterStore from "../store/store.jsx";
import Tutorial from "../components/pages/tutorial.jsx";
import Game from "../components/pages/game.jsx";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navigation(){

    let logged_in = useTwitterStore((state) => state.logged_in);
    let tutorial_completed = useTwitterStore((state) => state.tutorial_completed);

    return (
        <div className="flex flex-col justify-start items-center w-[300px] bg-dodger-blue-100 shadow-xl rounded-md m-4 overflow-hidden">
            <div className="w-full bg-dodger-blue-500 font-extrabold text-center text-5xl py-2 text-dodger-blue-50 flex flex-row justify-center items-center">
                <div className="">Twister</div>
                <Icon icon="bi:tornado" className="text-4xl text-gray-300"/>
            </div>
            {!logged_in && <Login />
            }

            {logged_in && !tutorial_completed && 
                <Tutorial />
            }

            {tutorial_completed &&
                <Game />}
        </div>
    );
}