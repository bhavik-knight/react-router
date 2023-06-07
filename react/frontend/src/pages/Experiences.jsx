import { db, getData } from "../database/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

function Experiences() {
    const [experiences, setExperiences] = useState([])
    useEffect(() => {
        // immediate function invocation - check reference video
        (async function () {
            try {
                let data = await getData("experiences")
                setExperiences(data)
            } catch (err) {
                console.log(`Error in experiences: ${err.messages}`)
            }
            // console.log(`loaded: ${JSON.stringify(experiences)}`)
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
// reference: https://www.freecodecamp.org/news/how-to-use-the-firebase-database-in-react/
