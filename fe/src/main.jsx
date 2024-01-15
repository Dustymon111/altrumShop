import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Route ,Routes,BrowserRouter} from "react-router-dom"
import Cart from './Cart'
import Login from './login'
import Register from './register'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<App/>}/>
            <Route path='/cart' element = {<Cart/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
        </Routes>
    </BrowserRouter>
)
