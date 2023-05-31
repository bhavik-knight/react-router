import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="education" element={<Education />} />
        <Route path="experiences" element={<Experiences />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
