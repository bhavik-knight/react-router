import { useRef, useState, useCallback, useEffect } from 'react'


function Skills() {
    const [count, setCount] = useState(0)

    const handleDec = () => setCount(count => count - 1)
    const handleInc = () => setCount(count => count + 1)

    useEffect(() => {
        // call increment at 5 seconds interval
        setTimeout(() => handleInc(), 5000)
    }, [count])

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={handleDec}>-</button>
            <div style={{ margin: "2em" }}>{count}</div>
            <button onClick={handleInc}>+</button>
        </div>
    )
}


export { Skills }
