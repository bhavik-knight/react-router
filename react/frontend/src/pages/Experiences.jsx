import { db, getData } from "../database/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

function Experiences() {
    const [experiences, setExperiences] = useState([])
    useEffect(() => {
        (async function () {
            try {
                let data = await getData("experiences")
                setExperiences(data)
                console.log(`loaded: ${experiences}`)
            } catch (err) {
                console.log(`=== error occured ---- ${err}`)
            }
        })();
    }, [])

    return (
        <div>
            {
                experiences?.map(e => {
                    return (
                        <div key={e.id}>
                            <p>{e.title}</p>
                            <p>{e.company}, {e.place}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export { Experiences }


// reference: https://www.youtube.com/watch?v=mLjVoYhwRkQ
