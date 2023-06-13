import React, { useState } from 'react'
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import { LoginContext } from './LoginContext';
import Login from './Login';

const App = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [userName, setUserName] = useState("")

  return (
    <BrowserRouter>
      <div className='app'>
        <LoginContext.Provider value={{setUserLogin, setUserName}}>
        {!userLogin?(
          <div className="register_login">
            <Routes>
              <Route path='/' element={<Register />}/>
              <Route path='/login' element={<Login />}/>
            </Routes>
          </div>
        ):(
          <div className="appBody">
            <Sidebar userName={userName}/>
            <Routes>
              <Route path="/" element={<Chat userName={userName}/>} />
              <Route path="/group/:groupId" element={<Chat userName={userName}/>} />
            </Routes>
        </div>
          )}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App