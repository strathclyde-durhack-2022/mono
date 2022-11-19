import React, { useState, useEffect, useRef } from "react";

export function Timer(){
    const [secondsLeft, setSecondsLeft] = useState(300) //set timer to 300s (5 mins)
    useEffect(() => {
        const secondTimer = setInterval((() => setSecondsLeft(secondsLeft-1)), 1000) //decrement seconds
        if (secondsLeft == -1){ //triggers when we run out of time (should show 0:00)
            //INSERT CODE TO CLEAR DATA
            setSecondsLeft(300) //reset timer (could potentially need to be done elsewhere)
        }
        return () => clearInterval(secondTimer) //idk what this does no cap
    })
    //string to display to user
    let timeString: string = "";
    //add 0 to string when needed - (if change font fixed width looks best)
    if (secondsLeft%60 < 10){
        timeString = Math.floor(secondsLeft/60)+":"+"0"+secondsLeft%60
    }
    else timeString = Math.floor(secondsLeft/60)+":"+secondsLeft%60

    return(
        <div className="grid place-items-center"><p className="font-['Fira Code'] text-8xl">{timeString}</p></div>
    )
}