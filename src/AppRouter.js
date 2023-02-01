import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Navigation from "./Navigation"
import MNavigation from "./MNavigation"
import Cultivation from './components/Cultivation/Cultivation';
import Glasscontrol from './components/Glasscontrol';
import Autocontrol from './components/Autocontrol';
import Main from "./components/Main"

const AppRouter = ()=> {
    return (
        <div className="main_body">
          <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/Main" element={<Main/>} />
                <Route path="/Autocontrol" element={<Autocontrol/>} />
                <Route path="/Cultivation" element={<Cultivation/>} />
                <Route path="/Glasscontrol" element={<Glasscontrol/>} />
            
            </Routes>
          </BrowserRouter>
          </div>
        )
}

const MAppRouter = ()=> {
  return (
      <div className="main_body">
        <BrowserRouter>
          <MNavigation/>
          <Routes>
              <Route path="/Main" element={<Main/>} />
              <Route path="/Autocontrol" element={<Autocontrol/>} />
              <Route path="/Cultivation" element={<Cultivation/>} />
              <Route path="/Glasscontrol" element={<Glasscontrol/>} />
          
          </Routes>
        </BrowserRouter>
        </div>
      )
}

export  {AppRouter, MAppRouter};