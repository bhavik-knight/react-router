import { nanoid } from "nanoid"
import { useState, useEffect, useRef } from "react"

function RenderCarousel({ items, cardWidth = 800, cardHeight = 500 }) {
    const length = items.length
    const [current, setCurrent] = useState(0)
    function handlePrevClick() {
        current < 1 && setCurrent(current => current + length)
        setCurrent(current => (current - 1) % length)
    }
    function handleNextClick() {
        setCurrent(current => (current + 1) % length)
    }
    function handleBtnClick(index) {
        setCurrent(index)
    }

    const timeRef = useRef(0)
    useEffect(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current)
        }

        timeRef.current = setTimeout(() => handleNextClick(), 4000)

        return () => clearTimeout(timeRef.current)
    }, [handleNextClick])

    return (
        <>
            <div>{current + 1} of {length}</div>
            <div style={{
                overflow: "hidden",
                width: cardWidth
            }}>
                <div
                    style={{
                        display: "flex",
                        width: `${cardWidth * length}px`,
                        transition: `transform ease-out 1s`,
                        transform: `translate(${-(current * cardWidth)}px)`
                    }}
                >
                    {
                        items.map((item, index) => {
                            return (
                                <div
                                    key={nanoid()}
                                    style={{ width: `${cardWidth}px` }}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </div >
            </div >
            <button onClick={handlePrevClick}>←</button>
            <button onClick={handleNextClick}>→</button>
        </>
    )
}

export { RenderCarousel }
