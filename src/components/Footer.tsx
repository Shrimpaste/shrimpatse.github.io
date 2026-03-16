import { Github, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TerminalPrompt } from './TerminalPrompt';
import { author } from '../data/posts';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '博客', path: '/blog' },
  { label: '关于', path: '/about' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink-600/50 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <TerminalPrompt className="mb-4">echo "谢谢来访"</TerminalPrompt>
            <p className="text-text-muted text-sm leading-relaxed">
              在代码与文字之间寻找平衡。<br />
              用技术构建，用文字思考。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
              链接
            </h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={handleNavClick}
                    className="text-sm text-text-secondary hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
              联系
            </h4>
            <div className="flex gap-4">
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-ink-800 text-text-muted hover:text-text-primary hover:bg-ink-700 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${author.email}`}
                className="p-2 rounded-lg bg-ink-800 text-text-muted hover:text-text-primary hover:bg-ink-700 transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-ink-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © {currentYear} Made with
            <Heart size={12} className="inline mx-1 text-red-500" />
            and a lot of
            <span className="text-amber-400">coffee</span>
          </p>
          <p className="text-xs text-text-muted font-mono">
            Built with React + Tailwind + ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
