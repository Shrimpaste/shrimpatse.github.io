import { motion } from 'framer-motion';
import { ArrowRight, Code2, BookOpen, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TerminalPrompt, TerminalWindow } from '../components/TerminalPrompt';
import { PostCard } from '../components/PostCard';
import { posts, projects, author } from '../data/posts';

export function Home() {
  const recentPosts = posts.slice(0, 3);
  const featuredPost = posts[0];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] flex items-center justify-center px-4 sm:px-6 pt-24 md:pt-20 lg:pt-16 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto w-full">
          {/* Terminal Intro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <TerminalPrompt delay={0.2} className="text-xs sm:text-sm md:text-base">whoami</TerminalPrompt>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-text-primary mb-3 sm:mb-4 md:mb-6 leading-tight"
          >
            {author.name}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="text-amber-400"
            >
              _
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary mb-2 sm:mb-3 md:mb-4 font-light"
          >
            {author.title}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-text-muted max-w-2xl mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm sm:text-base"
          >
            {author.bio}
          </motion.p>

          {/* Stats / Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="max-w-full sm:max-w-lg"
          >
            <TerminalWindow title="stats.sh">
              <div className="space-y-1 sm:space-y-1.5 md:space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-mint-400">→</span>
                  <span className="text-text-muted">articles:</span>
                  <span className="text-amber-400">{posts.length}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-mint-400">→</span>
                  <span className="text-text-muted">projects:</span>
                  <span className="text-amber-400">{projects.length}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-mint-400">→</span>
                  <span className="text-text-muted">coffee:</span>
                  <span className="text-amber-400">∞</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-mint-400">→</span>
                  <span className="text-text-muted">status:</span>
                  <motion.span
                    animate={{ opacity: [1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-mint-400"
                  >
                    coding...
                  </motion.span>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-2 sm:gap-3 md:gap-4"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-amber-400/10 border border-amber-400/50 rounded-lg text-amber-400 font-mono text-xs sm:text-sm hover:bg-amber-400/20 transition-all group active:scale-95 min-h-[44px] sm:min-h-[48px]"
            >
              <BookOpen size={14} className="sm:w-4 sm:h-4" />
              阅读文章
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform sm:w-3.5 sm:h-3.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-ink-800 border border-ink-600 rounded-lg text-text-secondary font-mono text-xs sm:text-sm hover:border-text-muted hover:text-text-primary transition-all active:scale-95 min-h-[44px] sm:min-h-[48px]"
            >
              <Code2 size={14} className="sm:w-4 sm:h-4" />
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-16 border-t border-ink-700/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <TerminalPrompt className="text-xs sm:text-sm md:text-base">cat featured.md</TerminalPrompt>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] sm:text-xs font-mono text-amber-400 mb-1.5 sm:mb-2 block">精选文章</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-text-primary mb-2 sm:mb-3 md:mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-text-secondary mb-3 sm:mb-4 md:mb-6 leading-relaxed text-sm sm:text-base">
                {featuredPost.excerpt}
              </p>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-mint-400 font-mono text-xs sm:text-sm hover:underline active:opacity-70"
              >
                阅读全文
                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-1 bg-ink-800/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-ink-700/50 overflow-x-auto"
            >
              {featuredPost.content.slice(0, 300).split('\n').slice(0, 8).map((line, i) => (
                <div key={i} className="font-mono text-[10px] sm:text-xs text-text-muted/60 truncate">
                  <span className="text-ink-600 select-none mr-2 sm:mr-3 md:mr-4 w-4 sm:w-5 inline-block">{i + 1}</span>
                  {line || ' '}
                </div>
              ))}
              <div className="font-mono text-[10px] sm:text-xs text-text-muted/40 pt-1.5 sm:pt-2">...</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-16 border-t border-ink-700/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
            <TerminalPrompt className="text-xs sm:text-sm md:text-base">ls -la posts/</TerminalPrompt>
            <Link
              to="/blog"
              className="text-xs sm:text-sm text-text-muted hover:text-amber-400 transition-colors font-mono active:opacity-70 px-2 py-1"
            >
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {recentPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-16 border-t border-ink-700/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <TerminalPrompt className="text-xs sm:text-sm md:text-base">git log --oneline projects</TerminalPrompt>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-ink-800/50 border border-ink-600/50 hover:border-amber-400/30 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Terminal size={14} className="text-amber-400 sm:w-4 sm:h-4" />
                  <h3 className="font-mono text-xs sm:text-sm text-text-primary group-hover:text-amber-400 transition-colors">
                    {project.name}
                  </h3>
                </div>
                <p className="text-text-muted text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-ink-700 text-text-muted font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Contact */}
      <section className="px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <TerminalPrompt className="justify-center mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">echo "保持联系"</TerminalPrompt>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-text-primary mb-2 sm:mb-3 md:mb-4">
            有新的想法，随时分享
          </h2>
          <p className="text-text-secondary mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
            不会频繁发送邮件，只有真正有价值的内容。
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto px-2 sm:px-0">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-ink-800 border border-ink-600 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-400/50 font-mono text-xs sm:text-sm min-h-[44px] sm:min-h-[48px]"
            />
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-400/10 border border-amber-400/50 rounded-lg text-amber-400 font-mono text-xs sm:text-sm hover:bg-amber-400/20 transition-all active:scale-95 min-h-[44px] sm:min-h-[48px]">
              订阅
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
