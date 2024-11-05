import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import RouteProtector from './Components/ProtectedRoute/RouteProtector'
import PageNotFound from './Components/PagerNotFound'


const Home = lazy(()=> import("./pages/Home"))
const Chat = lazy(()=> import('./pages/Chat'))
const Login = lazy(() => import('./pages/Login'))
const Group = lazy(() => import('./pages/Groups'))

function App() {


  return (
   <Routes>
    <Route path='/' element={<RouteProtector redirect='/login'><Home/></RouteProtector>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/chat/:id' element={<RouteProtector redirect='/login'><Chat/></RouteProtector>} />
    <Route path='/group' element={<RouteProtector redirect='/login'><Group/></RouteProtector>} />
    <Route path='*' element={<PageNotFound/>}/>
   </Routes>
  )
}

export default App
