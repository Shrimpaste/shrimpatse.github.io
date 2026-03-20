import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { TerminalPrompt } from '../components/TerminalPrompt';
import { ReadingProgress } from '../components/ReadingProgress';
import { posts } from '../data/posts';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import 'highlight.js/styles/github-dark.css';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const contentRef = useRef<HTMLDivElement>(null);
  const checkedRef = useRef(false);

  // 滑动手势支持 - 从右边缘向左滑动返回博客列表
  useSwipeGesture(contentRef, {
    onSwipeLeft: () => {
      if (nextPost) {
        navigate(`/blog/${nextPost.slug}`);
      }
    },
    onSwipeRight: () => {
      if (prevPost) {
        navigate(`/blog/${prevPost.slug}`);
      } else {
        navigate('/blog');
      }
    },
    threshold: 80,
  });

  useEffect(() => {
    if (!checkedRef.current) {
      checkedRef.current = true;
      if (!post) {
        navigate('/blog', { replace: true });
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug, post, navigate]);

  if (!post) return null;

  return (
    <>
      <ReadingProgress />

      <div ref={contentRef} className="min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 sm:mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-amber-400 transition-colors font-mono text-sm group min-h-[44px] px-2 -ml-2 rounded-lg hover:bg-ink-800/50"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              返回文章列表
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 sm:mb-10"
          >
            <TerminalPrompt className="mb-3 sm:mb-4 text-sm sm:text-base">cat {post.slug}.md</TerminalPrompt>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="tag min-h-[36px] text-xs sm:text-sm"
                >
                  <Tag size={10} className="mr-1" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-text-primary mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </motion.header>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="h-px bg-gradient-to-r from-ink-600 via-amber-400/30 to-ink-600 mb-8 sm:mb-10"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="markdown-content"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match && !className?.includes('hljs');

                  if (isInline) {
                    return (
                      <code className="bg-ink-700 px-1.5 py-0.5 rounded text-mint-400 text-sm" {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <div className="code-block my-4 sm:my-6">
                      <div className="code-header">
                        <div className="code-dot red" />
                        <div className="code-dot yellow" />
                        <div className="code-dot green" />
                        <span className="ml-2 text-xs text-text-muted font-mono">
                          {match ? match[1] : 'text'}
                        </span>
                      </div>
                      <pre className="p-3 sm:p-4 overflow-x-auto -mx-4 sm:mx-0 sm:rounded-b-xl">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-2 border-amber-400 pl-4 my-4 sm:my-6 italic text-text-muted text-sm sm:text-base">
                      {children}
                    </blockquote>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-4 sm:my-6 -mx-4 sm:mx-0">
                      <table className="w-full border-collapse min-w-[300px]">
                        {children}
                      </table>
                    </div>
                  );
                },
                thead({ children }) {
                  return <thead className="bg-ink-800">{children}</thead>;
                },
                th({ children }) {
                  return (
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-mono text-amber-400 border-b border-ink-600">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-text-secondary border-b border-ink-700/50">
                      {children}
                    </td>
                  );
                },
                a({ href, children }) {
                  const isExternal = href?.startsWith('http');
                  return (
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="text-mint-400 hover:underline break-words"
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 text-center"
          >
            <TerminalPrompt className="justify-center text-sm sm:text-base">EOF</TerminalPrompt>
          </motion.div>

          {/* Share / Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-ink-700/50"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-sm text-text-muted font-mono">
                觉得有帮助？分享给朋友
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="px-4 py-2.5 bg-ink-800 border border-ink-600 rounded-lg text-text-secondary text-sm font-mono hover:border-amber-400/50 hover:text-amber-400 transition-all active:scale-95 min-h-[44px]"
                >
                  复制链接
                </button>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="group p-4 rounded-xl bg-ink-800/50 border border-ink-600/50 hover:border-amber-400/30 transition-all active:scale-[0.98]"
              >
                <span className="flex items-center gap-1 text-xs text-text-muted font-mono mb-2">
                  <ChevronLeft size={14} />
                  上一篇
                </span>
                <span className="text-sm text-text-primary group-hover:text-amber-400 transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="group p-4 rounded-xl bg-ink-800/50 border border-ink-600/50 hover:border-amber-400/30 transition-all active:scale-[0.98] text-left sm:text-right"
              >
                <span className="flex items-center sm:justify-end gap-1 text-xs text-text-muted font-mono mb-2">
                  下一篇
                  <ChevronRight size={14} />
                </span>
                <span className="text-sm text-text-primary group-hover:text-amber-400 transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </motion.nav>

          {/* Mobile Swipe Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 flex items-center justify-center gap-4 text-xs text-text-muted md:hidden"
          >
            {prevPost && (
              <span className="flex items-center gap-1">
                <ChevronLeft size={12} />
                右滑上一篇
              </span>
            )}
            {nextPost && (
              <span className="flex items-center gap-1">
                左滑下一篇
                <ChevronRight size={12} />
              </span>
            )}
          </motion.div>
        </article>
      </div>
    </>
  );
}
