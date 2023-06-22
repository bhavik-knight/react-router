import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate("/skills")}>skills</button>
            <button onClick={() => navigate("/projects")}>projects</button>
            <button onClick={() => navigate("/education")}>education</button>
            <button onClick={() => navigate("/experiences")}>experiences</button>
            <button onClick={() => navigate("/contact")}>contact</button>
            <button onClick={() => navigate("/form")}>form</button>
        </div>
    )
}

export { Home }
