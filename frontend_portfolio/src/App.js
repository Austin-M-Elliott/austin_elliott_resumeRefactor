import { Route, Routes, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './contexts/theme';
import Header from './components/Header/Header';
import HomeHeader from './components/HomeHeader/HomeHeader';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Softskills from './components/Softskills/Softskills';
import AboutMe from './components/AboutMe/AboutMe';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AcesUp from './components/proj_AcesUp/acesUp';
import './App.css';

const App = () => {
  const [{ themeName }] = useContext(ThemeContext);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div id="top" className={`${themeName} app`}>
      {isHomePage ? <Header /> : <HomeHeader />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <About />
                <Projects />
                <Skills />
                <Softskills />
                <div className="divider" />
                <AboutMe />
                <Contact />
              </>
            }
          />
          <Route path="/acesUp" element={<AcesUp />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
