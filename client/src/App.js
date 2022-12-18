import React, {useState} from 'react';
// import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";
import DevSignUp from './components/DevSignUp';
import DevLogin from './components/DevLogin';
import Index from './components/Index';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';
import ProfileEdit from './components/ProfileEdit';
import NavBar from './components/NavBar';

function App() {
  const [user_id, setUser_id] = useState("");
  const [tech_id, setTech_id] = useState("");
  const [profile_id, setProfile_id] = useState("");
    


  return (
    <BrowserRouter>
      <div className="App">
        <div><NavBar/></div>
        <Routes>
          <Route element={<Index/>} path="/"/>
          <Route element={<DevSignUp setUser_id={setUser_id}/>} path="/devs/register"/>
          <Route element={<DevLogin/>} path="/devs/login"/>
          <Route element={<ProfileForm/>} path="/devs/profile"/>
          <Route element={<Dashboard/>} path="/devs/dashboard"/>
          <Route element={<ProfileEdit/>} path="/devs/profile/edit"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;

