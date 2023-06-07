import { useState, useEffect } from "react"
import { storage } from "../database/firebaseConfig"
import { ref, getDownloadURL } from "firebase/storage"

function ProjectImage({ path }) {
    const [imgURL, setImgURL] = useState("")

    async function getImgURL(path) {
        const storageRef = ref(storage)
        const imgRef = ref(storageRef, path)
        const data = await getDownloadURL(imgRef)
        return data
    }

    useEffect(() => {
        (async function () {
            try {
                let data = await getImgURL(path)
                setImgURL(data)
                console.log(`imgurl: ${imgURL}`)
            } catch (err) {
                console.log(`something went wrong in project image: ${err.message}`)
            }
        })()
    }, [path])

    return (
        <div><img src={imgURL} alt="display-image" /></div>
    )
}

export { ProjectImage }
