import React from 'react'
import {createRoot} from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Routes/Routes'
import "./style.css"

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
            <RouterProvider router={Router}/>
    </React.StrictMode>
)
