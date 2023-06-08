import { nanoid } from "nanoid"
import { useState, useEffect, useRef } from "react"
import { ProjectImage } from "./ProjectImage"

// arrow styles
const getArrowStyles = (direction) => ({
    cursor: "pointer",
    alignSelf: "center",
    marginInline: "10px"
})

function ProjectImageCarousel({ urls }) {
    const cardWidth = 800
    const length = urls.length
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

    function showButtons(active, siblings = 1) {
        // array of length <length> with indexes starting from 0
        if (length < siblings * 2 + 1) {
            return [...Array(length).keys()]
        }

        // set active buttons according to it's position
        if (active < siblings) {
            active = siblings
        } else if (active >= length - siblings) {
            active = length - siblings - 1
        }

        let newArray = [...Array(siblings * 2 + 1).keys()].map(i => i - siblings + active)
        return newArray
    }

    // autoplay
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
            <div>
                {current + 1} of {length}
            </div>
            <div style={{ display: "flex" }}>
                {/* left arrow */}
                <div onClick={handlePrevClick} style={getArrowStyles("left")}>❰</div>

                <div style={{ overflow: "hidden", width: cardWidth }}>
                    <div style={{
                        display: `flex`,
                        transition: `transform ease-out 0.5s`,
                        width: `${(cardWidth) * length}px`,
                        transform: `translate(${-(current * cardWidth)}px)`
                    }}>
                        {
                            urls.map((url, index) => {
                                return (
                                    <div
                                        key={nanoid()}
                                        style={{ width: `${cardWidth}px`, marginInline: "4px" }}
                                    >
                                        <ProjectImage path={url} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div onClick={handleNextClick} style={getArrowStyles("right")}>❱</div>
            </div >
        </>
    )
}

export { ProjectImageCarousel }
