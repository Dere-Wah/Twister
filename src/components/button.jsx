


export default function Button({text, fun}){
    return(
        <button onClick={() => fun()}
        className="bg-dodger-blue-400 px-2 text-white font-extrabold rounded-md
             transition-shadow duration-75 ease hover:shadow-sm hover:shadow-dodger-blue-950">
            {text}
        </button>
    )
}