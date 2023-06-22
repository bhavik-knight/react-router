import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik"
import * as yup from "yup"

// initial values for the form
const formInitValues = {
    name: "",
    email: "",
    message: ""
}

// validation the form input data
const formValidationSchema = yup.object({
    name: yup
        .string()
        .max(10, "Name is too long! Max length: 10")
        .required("Please tell me your name."),
    email: yup
        .string()
        .min(3, "Email must be at least 3 characters long!")
        .email("Invalid email! Please check your email.")
        .required("Email is required to send the email!"),
    message: yup
        .string()
        .required("Please enter your message."),
})

function CreateTextField({ label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <div sx={{ padding: "2px", margin: "4px" }}>
            <label htmlFor={props.name}>{label}</label>
            <input {...field} {...props} />
            <br />
            {meta.touched && meta.error && <div>{meta.error}</div>}
        </div>
    )
}

function CreateTextAreaField({ label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <div sx={{ padding: "2px", margin: "4px" }}>
            <label htmlFor={props.name}>{label}</label>
            <textarea {...field} {...props} />
            <br />
            {meta.touched && meta.error && <div>{meta.error}</div>}
        </div>
    )
}

function FormikForm() {

    function handleSubmit(values) {
        console.log(`form submit: ${JSON.stringify(values)}`)
    }

    return (
        <div>
            <Formik
                initialValues={formInitValues}
                validationSchema={formValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <CreateTextField
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        placeholder="Jane Doe"
                    />

                    <CreateTextField
                        id="email"
                        name="email"
                        label="Email ID"
                        type="email"
                        placeholder="jane.doe@example.com"
                    />

                    <CreateTextAreaField
                        id="message"
                        name="message"
                        label="Message"
                        type="text"
                        placeholder="Comments ..."
                    />

                    <button type="submit">send</button>
                </Form>
            </Formik>
        </div >
    )
}

export { FormikForm }
