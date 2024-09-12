

export default function Info({message, negative}){
    return(
        <div>
            {negative != true && 
                <div className="border-2 border-black/50 text-xs w-full bg-gradient-to-b from-dodger-blue-600 to-dodger-blue-700 text-white rounded-md font-bold text-center px-2">
                    {message}
                </div>
            }
            {negative == true && 
                <div className="border-2 border-black/50 text-xs w-full bg-gradient-to-b from-red-600 to-red-700 text-white rounded-md font-bold text-center px-2">
                    {message}
                </div>
            }
        </div>
    );
}