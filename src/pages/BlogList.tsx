import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { TerminalPrompt } from '../components/TerminalPrompt';
import { PostCard } from '../components/PostCard';
import { posts, allTags } from '../data/posts';

export function BlogList() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <TerminalPrompt className="mb-4">ls -la writings/</TerminalPrompt>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">
            所有文章
          </h1>
          <p className="text-text-secondary max-w-2xl">
            关于编程、技术与生活的思考。在这里，我记录学习过程中的顿悟，分享对工具和方法的探索。
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文章..."
              className="w-full pl-11 pr-10 py-3 bg-ink-800 border border-ink-600 rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-400/50 transition-colors font-mono text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex items-start gap-3">
            <Filter size={16} className="text-text-muted mt-2 shrink-0" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`tag ${selectedTag === null ? 'active' : ''}`}
              >
                全部
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`tag ${selectedTag === tag ? 'active' : ''}`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-sm text-text-muted font-mono"
        >
          找到 {filteredPosts.length} 篇文章
          {selectedTag && (
            <span>
              {' '}
              · 标签: #{selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="ml-2 text-amber-400 hover:underline"
              >
                清除
              </button>
            </span>
          )}
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={`${selectedTag}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <TerminalPrompt className="justify-center mb-4">grep -r "{searchQuery}" .</TerminalPrompt>
              <p className="text-text-muted">没有找到匹配的文章</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className="mt-4 text-amber-400 hover:underline font-mono text-sm"
              >
                清除筛选
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Archive Link */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <TerminalPrompt className="justify-center mb-4">
              cat archive.txt | wc -l
            </TerminalPrompt>
            <p className="text-text-muted text-sm">
              共 {posts.length} 篇文章 · 持续更新中
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
