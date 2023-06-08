import { useState, useEffect } from "react"
import { storage } from "../database/firebaseConfig"
import { ref, getDownloadURL } from "firebase/storage"
import { Document, Page } from "react-pdf"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css';


import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function Education() {
    const [count, setCount] = useState(0)

    const handleDec = () => setCount(count => count - 1)
    const handleInc = () => setCount(count => count + 1)

    const getCertURL = async (path) => {
        try {
            const storageRef = ref(storage)
            const dataRef = ref(storageRef, path)
            const data = await getDownloadURL(dataRef)
            return data
        } catch (err) {
            throw err
        }
    }


    // certificates
    const [certificates, setCertificates] = useState([])
    useEffect(() => {
        (
            async function () {
                try {
                    let data = await getCertURL("certificates/harvard/Harvardx_CS50x_Puzzle_Day_2019.pdf")
                    setCertificates(data)
                } catch (err) {
                    console.log(`error occured in education: ${err.message}`)
                }
            }
        )()
    }, [])

    useEffect(() => {
        // call increment at 5 seconds interval
        setTimeout(() => handleInc(), 5000)
    }, [count])

    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <button onClick={handleDec}>-</button>
                <div style={{ margin: "2em" }}>{count}</div>
                <button onClick={handleInc}>+</button>
            </div>

            {/* certificates */}
            {/* <div>
                <embed
                    src="./certificates/harvard/Harvardx_CS50x_Puzzle_Day_2019.pdf"
                    style={{ width: "800px", height: "600px" }}
                />
            </div> */}

            <div>
                <Document
                    file="./certificates/harvard/Harvardx_CS50x_Puzzle_Day_2019.pdf"
                >
                    <Page pageNumber={1} width={300} height={200} />
                </Document>
            </div>
        </>
    )
}

export { Education }
