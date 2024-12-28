import HomePage from './Components/HomePage'
import Login from './Components/Login'
import NotFound from './Components/NotFound'
import Register from './Components/Register'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import Logout from './Components/Logout'
import ListFiles from './Components/ListFiles'
import EntryPoint from './Components/EntryPoint'
export default function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' Component={EntryPoint}/>
       <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>

        <Route path='/homepage' Component={ProtectedRoute}>
        <Route path="/homepage" Component={HomePage}/>
        </Route>
        
        <Route path='/listfiles' Component={ProtectedRoute}>
        <Route path='/listfiles' Component={ListFiles}/>
        </Route>

        <Route path='/logout' Component={Logout}/>
        <Route path="*" Component={NotFound}/>
      </Routes>
    </Router>
  )
}