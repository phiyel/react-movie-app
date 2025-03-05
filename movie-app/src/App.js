import React from 'react';
//Routing 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from './components/DomLayout';

//context
import UserProvider from './context/UserProvider'; 
//styles
import { GlobalStyle } from './GlobalStyle';

const App = () => {
  return (
    <Router>  
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:movieId" element={<Movie />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
        <GlobalStyle />
       </UserProvider>
    </Router>
  );
};

export default App;
