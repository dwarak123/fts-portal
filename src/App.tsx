
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/header";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7, DarkMode } from '@mui/icons-material';
import { useEffect, useState } from 'react';



function App() {

  const storedMode = localStorage.getItem('theme');
  const [themeMode, setThemeMode] = useState(storedMode || '');


  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    
  };

  useEffect(() => {
    console.log(`You are using a mode ${themeMode}`);
  }, [themeMode]);

  localStorage.setItem('theme', themeMode);





  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#e91e63',
      },

    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    }
  });

  //const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <ResponsiveAppBar />
        <IconButton color="inherit" onClick={toggleTheme}> <h6>dark light</h6>
          {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mod" element={<BoardModerator />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
