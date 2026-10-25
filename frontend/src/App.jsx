import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import Developer from './pages/Developer';
import LoadingScreen from './components/ui/LoadingScreen';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainApp() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Trigger translucent logo screen on initial refresh and page navigation
    setIsLoading(true);

    // Initial page refresh duration: ~750ms, Route transitions: ~550ms
    const timerDuration = isFirstRender.current ? 750 : 550;
    isFirstRender.current = false;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timerDuration);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  const handleManualTrigger = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      <ScrollToTop />
      {/* Translucent Page Overlay with Cairnloop Technologies Logo */}
      <LoadingScreen isVisible={isLoading} />

      <div className="min-h-screen flex flex-col bg-background font-body-md text-on-background">
        <Header onLogoClick={handleManualTrigger} />
        <main className="w-full pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/developers" element={<Developer />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
