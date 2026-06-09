import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Account from "./pages/account";
import Search from "./pages/search";
import ProfileView from "./pages/ProfileView"

const App = () => {
  const [user, setUser] = useState(null);

  
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/account" element={<Account />} />
        <Route path="/search" element={<Search/>}/>
        <Route 
        path="/profile/:id"
        element={<ProfileView/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;