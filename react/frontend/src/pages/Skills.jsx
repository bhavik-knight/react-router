import { nanoid } from "nanoid"
import { useRef, useState, useCallback, useEffect } from 'react'
import { getData, storage } from "../database/firebaseConfig"
import { ProjectImage } from "../components/ProjectImage"
import { ProjectImageCarousel } from "../components/ProjectImageCarousel"

function Skills() {
    const [projects, setProjects] = useState([])
    const [images, setImages] = useState([])

    // to get all projects data
    useEffect(() => {
        (async function () {
            try {
                let data = await getData("projects")
                setProjects(data)
            } catch (err) {
                console.log(`error occured on skills: ${err.message}`)
            }
        })()
    }, [])

    return (
        <div>
            {
                projects.map((p, id) => {
                    return (
                        <div key={nanoid()}>
                            <p>{p.title}</p>
                            {p.uri && <a href={p.uri}>link</a>}
                            {
                                p.displayImg !== undefined &&
                                <ProjectImage path={p.displayImg} />
                            }
                            <p>{p.technologies}</p>
                            {
                                p.projectImgs !== undefined && <ProjectImageCarousel urls={p.projectImgs} />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}


export { Skills }
