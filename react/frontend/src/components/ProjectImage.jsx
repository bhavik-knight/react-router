import "./ProjectImage.css"
import { useState, useEffect } from "react"
import { getURL } from "../database/firebaseConfig"

function ProjectImage({ path }) {
    const [imgURL, setImgURL] = useState("")
    useEffect(() => {
        // immediate function invocation
        (async function () {
            try {
                let data = await getURL(path)
                setImgURL(data)
            } catch (err) {
                console.log(`something went wrong in project image: ${err.message}`)
            }
        })()

    }, [path])

    return (
        <div style={{ backgroundImage: `url(${imgURL})` }} className="project-images">
        </div>
    )
}

export { ProjectImage }
