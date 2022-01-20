import React from 'react'
import './App.css'
import AuthorizationContainer from "./content/login/loginContainer";
import {Link, Route, Routes} from "react-router-dom";
import NavbarContainer from "./navbar/navbarContainer";
import ProfileContainer from "./content/profile/profileContainer";
import UsersContainer from "./content/users/usersContainer";

const Users = () => {
    return (
        <div>
            <Link to="me">My Profile</Link>
            <Routes>
                <Route path="?:id" element={<UsersContainer/>}/>
                <Route path="me" element={<ProfileContainer/>}/>
            </Routes>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <NavbarContainer/>
            <Routes>
                <Route path='/users/*' element={<Users/>}/>
                <Route path='/auth' element={<AuthorizationContainer/>}/>
                <Route path='*' element={<div className='error'><h1>404 Page not found</h1></div>}/>
            </Routes>
        </div>
    );
}

export default App;
