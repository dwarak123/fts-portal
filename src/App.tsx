
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import { CssBaseline } from "@mui/material";

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
