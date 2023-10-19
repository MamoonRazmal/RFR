import {Route,Routes} from 'react-router-dom'
import HomePage from "./pages/Home"
import './App.css'
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotfound from './pages/PageNotfound';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotfound/>}/>
    </Routes>
    
    
    
    </>
  )
}

export default App
