import "./ProjectImage.css"
import { useState, useEffect } from "react"
import { getImgURL } from "../database/firebaseConfig"

function ProjectImage({ path }) {
    const [imgURL, setImgURL] = useState("")



    useEffect(() => {
        // immediate function invocation
        (async function () {
            try {
                let data = await getImgURL(path)
                setImgURL(data)
            } catch (err) {
                console.log(`something went wrong in project image: ${err.message}`)
            }
        })()

        // console.log(`imgurl: ${imgURL}`)
    }, [path])

    return (
        <div style={{ backgroundImage: `url(${imgURL})` }} className="project-images"></div>
    )
}

export { ProjectImage }
