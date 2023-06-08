import { nanoid } from "nanoid"
import { useRef, useState, useCallback, useEffect } from 'react'
import { getData, storage } from "../database/firebaseConfig"
import { ProjectImage } from "../components/ProjectImage"


function Skills() {
    const [projects, setProjects] = useState([])

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
                        <div key={id}>
                            <p>{p.title}</p>
                            {p.uri && <a href={p.uri}>link</a>}
                            <ProjectImage path={p.displayImg} />
                            <p>{p.technologies}</p>
                            {/*
                                {
                                    p.projectImgs.map(url => <ProjectImage key={nanoid()} path={url} />)
                                }
                            */}
                        </div>
                    )
                })
            }
        </div>
    )
}


export { Skills }
