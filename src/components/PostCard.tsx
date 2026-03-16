import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import type { Post } from '../types';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block p-6 -mx-6 rounded-xl transition-all duration-300 hover:bg-ink-800/50"
      >
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-muted font-mono mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif text-text-primary mb-2 group-hover:text-amber-400 transition-colors duration-300">
          {post.title}
          <ArrowUpRight
            size={16}
            className="inline-block ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
          />
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-ink-700/50 text-text-muted border border-ink-600 group-hover:border-ink-500 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}

interface PostCardCompactProps {
  post: Post;
  index?: number;
}

export function PostCardCompact({ post, index = 0 }: PostCardCompactProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex items-start gap-4 py-3 border-b border-ink-700/50 last:border-0 hover:pl-2 transition-all duration-300"
      >
        <span className="text-xs text-text-muted font-mono mt-1 shrink-0 w-20">
          {post.date}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-text-primary group-hover:text-amber-400 transition-colors truncate">
            {post.title}
          </h4>
        </div>
        <ArrowUpRight
          size={14}
          className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
        />
      </Link>
    </motion.div>
  );
}
