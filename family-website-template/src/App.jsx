

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import MemberCard from './components/MemberCard';
import EventsSection from './components/EventsSection';
import Gallery from './components/Gallery';
import MemberDetails from './components/MemberDetails';
import MemoryDetails from './components/MemoryDetails';
import { familyMembers } from './data/familyData';
import { AnimatePresence } from 'framer-motion';

import ScrollToTop from './components/ScrollToTop';
import { AudioProvider } from './components/AudioController';

function App() {
  const location = useLocation();

  return (
    <AudioProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/member/:id" element={<MemberDetails />} />
          <Route path="/memory/:id" element={<MemoryDetails />} />
        </Routes>
      </AnimatePresence>
    </AudioProvider>
  );
}

const Home = () => {
  const [opacity, setOpacity] = React.useState(0);

  React.useLayoutEffect(() => {
    // Small delay to allow scroll restoration to happen first
    const timer = setTimeout(() => setOpacity(1), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ opacity, transition: 'opacity 0.2s ease-in' }}>
      <Hero />

      <section style={styles.membersSection}>
        <div className="container">
          <h2 className="section-title">The Family</h2>
          <div className="members-grid">
            {familyMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <EventsSection />

      <Gallery />

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Lalitham Sundaram. All rights reserved.</p>
        <p style={styles.footerNote}>Made with love for the family.</p>
      </footer>
    </div>
  );
};


const styles = {
  membersSection: {
    padding: '5rem 0',
    backgroundColor: '#0a0a0a', // Dark bg
  },

  footer: {
    backgroundColor: '#000', // Pure black
    color: '#fff',
    textAlign: 'center',
    padding: '3rem 2rem',
    marginTop: 'auto',
    borderTop: '1px solid #222',
  },
  footerNote: {
    fontSize: '0.8rem',
    color: '#555',
    marginTop: '0.5rem',
    letterSpacing: '1px',
  }
};

export default App;
