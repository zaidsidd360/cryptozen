import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Signin from "./routes/Signin"
import Signup from "./routes/Signup"
import Account from "./routes/Account"
import CoinPage from "./routes/CoinPage"
import {ThemeProvider} from "./context/ThemeContext";
import Footer from "./components/Footer";
import {AuthContextProvider} from "./context/AuthContext"

function App() {

  return (
    <ThemeProvider>
      <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/cryptozen" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/coin/:coinId" element={<CoinPage/>}>
          <Route path=":coinId"/>
        </Route>
      </Routes>
      <Footer/>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
