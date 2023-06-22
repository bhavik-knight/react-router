import { nanoid } from "nanoid"
import { useState, useEffect, useCallback } from "react"
import { storage, getData, getURL } from "../database/firebaseConfig"
import { ref, getDownloadURL } from "firebase/storage"
import { Document, Page } from "react-pdf"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'


import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import { RenderCarousel } from "../components/RenderCarousel"


// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

function Education() {
    const [certs, setCerts] = useState([])



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


    useEffect(() => {
        (
            async function () {
                try {
                    let data = await getData("certificates")
                    let certsURL = data[0].path
                    setCerts(certsURL)
                } catch (err) {
                    console.log(`error occured in edu / certs: ${err.message}`)
                }
            }
        )()
        console.log(`certs$: ${certs}`)
    }, [])

    const pdfViwer = useCallback(
        certs.map(url => {
            return (
                <div key={nanoid()} style={{ width: "800px", height: "fit-content" }}>
                    <Worker key={nanoid()} workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                        <Viewer
                            key={nanoid()}
                            fileUrl={url}
                        />
                    </Worker>
                </div>
            )
        }),

        [certs]
    )

    return (
        <>
            {/* certificate - react-pdf-viewer */}
            <RenderCarousel items={pdfViwer} />

            {/* <div style={{ width: "800px", height: "fit-content" }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js" >
                    <Viewer fileUrl=
                        "https://firebasestorage.googleapis.com/v0/b/portfolio-database-9feb8.appspot.com/o/certificates%2Fharvard%2FHarvardx_CS50x_Introduction_to_Computer_Science.pdf?alt=media&token=9870fb56-64c2-4186-b671-3609b2ee40eb"
                    />
                </Worker>
            </div> */}

            {/* certificates */}
            {/* <div>
                <embed
                    style={{ width: "800px", height: "600px" }}
                    src=
                    "https://firebasestorage.googleapis.com/v0/b/portfolio-database-9feb8.appspot.com/o/certificates%2Fharvard%2FHarvardx_CS50x_Introduction_to_Computer_Science.pdf?alt=media&token=9870fb56-64c2-4186-b671-3609b2ee40eb"
                />
            </div> */}
            {/* <div>
                <Document
                    file=
                    "https://firebasestorage.googleapis.com/v0/b/portfolio-database-9feb8.appspot.com/o/certificates%2Fharvard%2FHarvardx_CS50x_Introduction_to_Computer_Science.pdf?alt=media&token=9870fb56-64c2-4186-b671-3609b2ee40eb"
                >
                    <Page pageNumber={1} width={300} height={200} />
                </Document>
            </div> */}
        </>
    )
}

export { Education }
