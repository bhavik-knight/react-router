import { useRef } from "react"
import emailjs from "@emailjs/browser"

function Contact() {
    const form = useRef()

    async function send() {
        try {

            let emailResponse = await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            return emailResponse
        } catch (err) {
            throw err
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        (async function () {
            try {
                let data = await send()
                console.log(`email sent ${JSON.stringify(data)}`)
            } catch (err) {
                console.log(`email sent response: ${err.message}`)
            }
        })()

        console.log(`handiling was done before email sent ${form.current.message.name} `)
    }

    return (
        <div>
            this is a form
            <form ref={form} onSubmit={handleSubmit}>
                <div>
                    <label name="name">Name</label>
                    <input name="name" id="name" type="text"></input>
                </div>
                <div>
                    <label name="email">Email</label>
                    <input name="email" id="email" type="email"></input>
                </div>
                <div>
                    <label name="subject">Subject</label>
                    <input name="subject" id="subject" type="text"></input>
                </div>
                <div>
                    <label name="message">Message</label>
                    <textarea name="message" id="messsage" type="text"></textarea>
                </div>

                <button type="submit">send</button>
            </form>
        </div>
    )
}

export { Contact }
