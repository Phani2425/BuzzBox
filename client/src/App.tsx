import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const Home = lazy(()=> import("./pages/Home"))
const Chat = lazy(()=> import('./pages/Chat'))
const Login = lazy(() => import('./pages/Login'))
const Group = lazy(() => import('./pages/Groups'))

function App() {


  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/chat/:id' element={<Chat/>} />
    <Route path='/group' element={<Group/>} />
   </Routes>
  )
}

export default App
