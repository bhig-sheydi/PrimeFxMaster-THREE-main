// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import { Home } from "./Components/Home";
import Faqs from "./Components/Faqs";
import HowItWorks from "./Components/HowItWorks";
import About from "./Components/About";
import Nav from "./Components/Nav/Nav";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { MyContextProvider, useMyContext } from "./Components/Mycontext";
import { auth } from "./config/firebase";
import Nav2 from "./Components/Nav2";
import HomeMain from "./Components/HomeMain";
import TradingAccount from "./Components/TradingAccount";
import CreateAccount from "./Components/CreateAccount";
import Promotions from "./Components/Promotions";
import RandomUser from "./Components/RandomUser";
import Footer from "./Components/Footer";
import DashBoard from "./Components/Nav/DashBoard";
import Chart from "./Components/Chart";
import VerifyData from "./debuging/Verify";
import Admin from "./Components/Admin";
import ChartReal from "./Components/ChartReal";
import Withdrawal from "./Components/Withdraw";
import ScrollToTop from "./Components/ScrollToTop";
import TermsAndConditions from "./Components/TermAndConditions";
import Donate from "./Page/Donate";

function App() {
  return (
    <MyContextProvider>
      <AppContent />
    </MyContextProvider>
  );
}

function AppContent() {
  const { isNavbarVisible } = useMyContext(); // Use the context to access isNavbarVisible
  const [visible,setVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  useEffect(() => {
    // Monitor authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user);
    });

    return () => unsubscribe();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div className={`all ${isLoggedIn ? "flex   overflow-hidden " : ""}`}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={isLoggedIn ? <DashBoard /> : <Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/workings" element={<HowItWorks />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tradingAcc" element={<TradingAccount />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/promo" element={<Promotions />} />
            <Route path="/CopyTrading" element={<RandomUser />} />
            <Route path="/trade" element={<Chart />} />
            <Route path="/realTrade" element={<ChartReal />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/v" element={<Withdrawal />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/TermsAndCondition" element={<TermsAndConditions />} />
          </Routes>
          {isLoggedIn ? (
            <Nav2 />
          ) : (
            visible == false && <Nav scrollToSection={scrollToSection} />
          )}{" "}
          {/* Conditionally render Nav2 or Nav */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
