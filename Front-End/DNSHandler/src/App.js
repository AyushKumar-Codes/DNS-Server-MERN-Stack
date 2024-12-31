import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  return (
      <>
        <Header />
        <div className="app-container">
          <MainContent />
          <Footer/>
        </div>
      </>
  );
}

export default App;
