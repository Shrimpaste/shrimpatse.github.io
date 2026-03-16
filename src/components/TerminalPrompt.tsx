import { motion } from 'framer-motion';

interface TerminalPromptProps {
  children: React.ReactNode;
  className?: string;
  showCursor?: boolean;
  delay?: number;
}

export function TerminalPrompt({
  children,
  className = '',
  showCursor = true,
  delay = 0
}: TerminalPromptProps) {
  return (
    <motion.div
      className={`font-mono text-sm ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span className="text-mint-400">$</span>
      <span className="text-text-secondary ml-2">{children}</span>
      {showCursor && (
        <motion.span
          className="text-mint-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        >
          _
        </motion.span>
      )}
    </motion.div>
  );
}

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function TerminalWindow({ children, title = 'terminal', className = '' }: TerminalWindowProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-ink-600 bg-ink-800 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-ink-700 border-b border-ink-600">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-3 text-xs text-text-muted font-mono">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}
