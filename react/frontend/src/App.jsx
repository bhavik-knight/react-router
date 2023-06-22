import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"


import { Layout } from "./layouts/Layout"
import { Home } from "./pages/Home"
import { Skills } from "./pages/Skills"
import { Projects } from "./pages/Projects"
import { Education } from "./pages/Education"
import { Experiences } from "./pages/Experiences"
import { Contact } from "./pages/Contact"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="education" element={<Education />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App


// reference for react-router-dom: https://www.youtube.com/watch?v=iXsM6NkEmFc
