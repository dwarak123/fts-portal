import { Component } from "react";
import { Routes, Route, redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { render } from "react-dom";
import AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";
import Avatar from "react-avatar";
import { CssBaseline } from "@mui/material";
import authService from "./services/auth.service";
const currentUser = authService.getCurrentUser();
type Props = {};

type State = {
  showModeratorBoard: boolean | undefined;
  showAdminBoard: boolean | undefined;
  currentUser: IUser | undefined;
  hour: number;
};


function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
     
        <Route path="/admin" element={<BoardAdmin />} />
        
        
        <Route path="/register" element={<Register />} />
       
        <Route path="/profile" element={<Profile />} />
       
        <Route path="/user" element={<BoardUser />} />
    
        <Route path="/mod" element={<BoardModerator />} />
     
      </Routes>
    </>
  );
}
export default App;
