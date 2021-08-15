import './App.css';
import React from "react";
import LoginButton from './components/LoginButton';
// import LogOutButton from './components/LogOutButton';
import Profile from './components/Profile';
import {useAuth0} from "@auth0/auth0-react"
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Sidemenu from './components/Sidemenu';


function App() {
  const {isLoading} = {useAuth0};

if(isLoading) return <div>Loading...</div>

  return (
    <>
 
      <LoginButton/>
      <Navbar/>
      <Sidemenu/>
      <Profile/>
      {/* <LogOutButton/> */}
      
      </>
  );
}

export default App;
