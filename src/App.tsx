import { HashRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { PostDetail } from './pages/PostDetail';
import { About } from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // 只在正常导航时滚动到顶部，而不是浏览器前进/后退
    if (navigationType === 'PUSH') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, navigationType]);

  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        style={{ minHeight: '60vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-ink-900 paper-texture">
      <ScrollToTop />
      <Header />
      <main className="relative border-t border-ink-900">
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/blog"
            element={
              <PageTransition>
                <BlogList />
              </PageTransition>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <PageTransition>
                <PostDetail />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
