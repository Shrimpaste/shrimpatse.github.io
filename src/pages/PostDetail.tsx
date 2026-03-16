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
import 'highlight.js/styles/github-dark.css';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const checkedRef = useRef(false);

  useEffect(() => {
    // 只在初始加载时检查文章是否存在，避免切换文章时错误导航
    if (!checkedRef.current) {
      checkedRef.current = true;
      if (!post) {
        navigate('/blog', { replace: true });
      }
    }
    // slug 变化时立即滚动到顶部（避免看到中间内容）
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug, post, navigate]);

  if (!post) return null;

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-amber-400 transition-colors font-mono text-sm group"
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
            className="mb-10"
          >
            <TerminalPrompt className="mb-4">cat {post.slug}.md</TerminalPrompt>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="tag text-xs"
                >
                  <Tag size={10} className="mr-1" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-primary mb-6 leading-tight">
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
            className="h-px bg-gradient-to-r from-ink-600 via-amber-400/30 to-ink-600 mb-10"
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
                    <div className="code-block my-6">
                      <div className="code-header">
                        <div className="code-dot red" />
                        <div className="code-dot yellow" />
                        <div className="code-dot green" />
                        <span className="ml-2 text-xs text-text-muted font-mono">
                          {match ? match[1] : 'text'}
                        </span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-2 border-amber-400 pl-4 my-6 italic text-text-muted">
                      {children}
                    </blockquote>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse">
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
                    <th className="px-4 py-3 text-left text-sm font-mono text-amber-400 border-b border-ink-600">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td className="px-4 py-3 text-sm text-text-secondary border-b border-ink-700/50">
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
                      className="text-mint-400 hover:underline"
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
            className="mt-16 text-center"
          >
            <TerminalPrompt className="justify-center">EOF</TerminalPrompt>
          </motion.div>

          {/* Share / Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 pt-10 border-t border-ink-700/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-text-muted font-mono">
                觉得有帮助？分享给朋友
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="px-4 py-2 bg-ink-800 border border-ink-600 rounded-lg text-text-secondary text-sm font-mono hover:border-amber-400/50 hover:text-amber-400 transition-all"
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
            className="mt-10 grid grid-cols-2 gap-4"
          >
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="group p-4 rounded-xl bg-ink-800/50 border border-ink-600/50 hover:border-amber-400/30 transition-all"
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
              <div />
            )}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="group p-4 rounded-xl bg-ink-800/50 border border-ink-600/50 hover:border-amber-400/30 transition-all text-right"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-text-muted font-mono mb-2">
                  下一篇
                  <ChevronRight size={14} />
                </span>
                <span className="text-sm text-text-primary group-hover:text-amber-400 transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </motion.nav>
        </article>
      </div>
    </>
  );
}
