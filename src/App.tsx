import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BecomeBodyguard from './pages/BecomeBodyguard';
import FooterSection from './sections/FooterSection';

function App() {
  useEffect(() => {
    // Update the document title on component mount
    document.title = 'SecureMate - Your Personal Security, One Tap Away';
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/become-bodyguard" element={<BecomeBodyguard />} />
          </Routes>
        </main>
        <FooterSection />
      </div>
    </Router>
  );
}

export default App;