import {useState} from 'react';
import {Greet} from "../wailsjs/go/main/App";
import { UserProvider } from './Context/userAuth';
import { Outlet, RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "./App.css"
import SidebarComponent from './Components/Sidebar/SidebarComponent';
import HomePage from './Pages/Home/HomePage';

function App() {

    const [expanded, setExpanded] = useState(true);

    return (
        <div id="App">
                <UserProvider>
                    <SidebarComponent expanded={expanded} setExpanded={setExpanded} />
                    <div  className={`main-content ${expanded ? '' : 'collapsed'}`}>
                        <HomePage/>
                    </div>
                    <Outlet/>             
                    <ToastContainer/>c 
                </UserProvider>        
        </div>
    )
}

export default App
