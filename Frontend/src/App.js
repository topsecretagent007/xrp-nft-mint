import logo from './logo.svg';
import './App.css';


import {Route,Routes,Link} from "react-router-dom";
import Home from './components/Home'
import { About } from './components/About'
import { Dashboard } from './components/Dashboard'





function App() {

  
  return (
              
              
              <div className="navbar">
                   
                    <Routes>

                      <Route path='/' element={<Dashboard  />} > </Route>
                      <Route path='/About' element={<About />}> </Route>
                     

                    </Routes>
                </div>  
  );
}

export default App;
