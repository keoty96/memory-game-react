import { useEffect, useRef } from "react"

export default function GameOver ({handleClick}) {

    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.focus()
    }, [])



    return (
        <div ref={divRef} tabIndex={-1}>
            <p>You've matched all the memory cards!!</p>
            <button className="restart-game" onClick={handleClick}>Restart</button>
        </div>
    )
}