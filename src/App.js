
import './App.css'
import Login from './components/main/login/index.jsx';
import Board from './components/main/board';
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useState} from 'react';
function App() {
  const userId = useSelector((state) => state.user);
  const [loggedIn, setloggedIn] = useState(false);

  function callbackFunction(childData) {
    setloggedIn(childData);
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login parentCallback={callbackFunction}/>} />
        <Route path="/board" element={userId? <Board userId={userId}/>:<Navigate to="/"/>}/>
        {/* <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={isAuth ?  <HomePage/>: <Navigate to="/"/>}/>
        <Route path="/home/round"  element={<MuiThemeProvider><Navbar/><Stage1/> */}{/* <Apps level={levelFactory(4 ** 2)} /> */}{/* </MuiThemeProvider> } />
        <Route path="/home/leader"  element={<Leader disables={true}/>} /> */}
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
