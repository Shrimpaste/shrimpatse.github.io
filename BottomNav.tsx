import { motion } from 'framer-motion';
import { Home, BookOpen, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/blog', label: '博客', icon: BookOpen },
  { path: '/about', label: '关于', icon: User },
];

export function BottomNav() {
  const location = useLocation();

  // 只在移动端显示
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      {/* Glassmorphism background */}
      <div className="mx-4 mb-4 bg-ink-800/90 backdrop-blur-xl border border-ink-600/50 rounded-2xl shadow-2xl shadow-black/40">
        {/* Top gradient line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 py-2 rounded-xl transition-all duration-200"
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute inset-0 bg-amber-400/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-amber-400' : 'text-text-muted'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-amber-400' : 'text-text-muted'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-amber-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Safe area padding for notched devices */}
      <div className="h-safe-area-inset-bottom bg-ink-900/50 backdrop-blur-sm" />
    </motion.nav>
  );
}
