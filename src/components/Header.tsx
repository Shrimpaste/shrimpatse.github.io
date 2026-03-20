import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'home' },
  { path: '/blog', label: 'blog' },
  { path: '/about', label: 'about' },
];

// 汉堡菜单按钮组件
function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-ink-800/50 border border-ink-600/50 active:scale-95 transition-all duration-200"
      aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      aria-expanded={isOpen}
    >
      <div className="w-5 h-5 relative flex flex-col justify-center items-center">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -4,
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="absolute w-5 h-0.5 bg-current rounded-full origin-center"
          style={{ backgroundColor: isOpen ? '#f59e0b' : '#e8e6e3' }}
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute w-5 h-0.5 bg-text-primary rounded-full"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 4,
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="absolute w-5 h-0.5 bg-current rounded-full origin-center"
          style={{ backgroundColor: isOpen ? '#f59e0b' : '#e8e6e3' }}
        />
      </div>
    </button>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 监听滚动，添加背景模糊效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由变化时关闭菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // 阻止菜单打开时背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ink-900/90 backdrop-blur-xl border-b border-ink-600/30 shadow-lg shadow-black/10'
            : 'bg-ink-900/50 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group min-h-[44px] min-w-[44px]"
          >
            <Terminal
              size={20}
              className="text-amber-400 group-hover:text-mint-400 transition-colors duration-300"
            />
            <span className="font-mono text-sm text-text-primary hidden sm:inline">
              <span className="text-amber-400">~</span>/
              <span className="group-hover:text-amber-400 transition-colors">blog</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 min-h-[44px] flex items-center ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-text-muted hover:text-text-primary hover:bg-ink-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-16 left-4 right-4 z-40 bg-ink-800/95 backdrop-blur-xl border border-ink-600/50 rounded-2xl shadow-2xl shadow-black/40 md:hidden overflow-hidden"
            >
              {/* Decorative top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

              <nav className="flex flex-col p-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 min-h-[56px] ${
                          isActive
                            ? 'bg-amber-400/10 text-amber-400'
                            : 'text-text-primary hover:bg-ink-700/50'
                        }`}
                      >
                        <span className="font-mono text-xs text-text-muted w-6">
                          0{index + 1}
                        </span>
                        <span className="font-mono text-base">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom decorative element */}
              <div className="px-4 py-3 border-t border-ink-600/30">
                <p className="text-xs text-text-muted font-mono text-center">
                  <span className="text-mint-400">$</span> navigate_to_destination
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
