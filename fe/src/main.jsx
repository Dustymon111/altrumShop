import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Route ,Routes,BrowserRouter} from "react-router-dom"
import Cart from './Cart'
import Login from './login'
import Register from './register'
import Navigator from './navigator'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element = {<App/>}/>
                    <Route path='/cart' element = {<Cart/>}/>
                    <Route path='/login' element = {<Login/>}/>
                    <Route path='/register' element = {<Register/>}/>
                </Routes>
            </BrowserRouter>
    </React.StrictMode>
)
