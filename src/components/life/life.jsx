import { useEffect, useRef, useState } from "react";

export default function Life({ controversial, banned }) {
    const sliderRefControversial = useRef(null);
    const sliderRefBanned = useRef(null);

    const [sliderWidthControversial, setSliderWidthControversial] = useState(0);
    const [sliderWidthBanned, setSliderWidthBanned] = useState(0);

    // Use useEffect to animate the sliders on load
    useEffect(() => {
        setTimeout(() => {
            setSliderWidthControversial(controversial);
        }, 100);

        setTimeout(() => {
            setSliderWidthBanned(banned);
        }, 200); // Add delay for animation staggering
    }, [controversial, banned]);

    return (
        <div className="flex flex-col w-full justify-start h-full">
            <div className="text-[10px] font-bold">Controversial</div>
            <div className="rounded-full min-h-[5px] border-red-900 border">
                <div
                ref={sliderRefControversial}
                className="bg-red-900 rounded-full h-full transition-all duration-1000 ease-in-out"
                style={{ width: `${sliderWidthControversial}%` }}
                />
            </div>
            {banned != null &&
                <div className="text-[10px] font-bold">Banned</div>
            }
            {banned != null && 
                <div className="rounded-full min-h-[5px] border-blue-700 border">
                    <div
                    ref={sliderRefBanned}
                    className="bg-blue-700 rounded-full h-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${sliderWidthBanned}%` }}
                    />
                </div>
            }
        </div>
    );
}
