import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import LoginPage from './Pages/LoginPage/LoginPage';
import { UserProvider } from './Context/userAuth';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }


    //todo: agregar router ya que navigate() da error cuando no se usa en ese contexto
    return (
        <div id="App">
            <UserProvider>
                <LoginPage/>
            </UserProvider>
            
        </div>
    )
}

export default App
