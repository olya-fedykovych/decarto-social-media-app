import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage/HomePage";
import LoginPage from "pages/loginPage/Login/Login";
import ProfilePage from "pages/profilePage/ProfilePage";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "./components/Theme";
import './scss/main.scss';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const { theme } = useContext(ThemeContext);


  return (
      <div className="App" id={theme}>
          <div className="overlay">
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route
                    path="/home"
                    element={isAuth ? <HomePage /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/profile/:userId"
                    element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
                  />
                </Routes>
            </BrowserRouter>
          </div>
        </div>
  );
}

export default App;
