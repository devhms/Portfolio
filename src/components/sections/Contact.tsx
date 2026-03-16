'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, Terminal as TerminalIcon } from 'lucide-react';

interface LogEntry {
  type: 'input' | 'system' | 'error' | 'success';
  content: string;
}

export function Contact() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', content: 'Welcome to the portfolio CLI. Type "help" to see available commands.' }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addLog = useCallback((entry: LogEntry) => {
    setLogs(prev => [...prev, entry]);
  }, []);

  const processCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = cmd.split('"');
    const value = parts[1] || '';

    if (trimmedCmd === 'help') {
      addLog({ type: 'system', content: 'Available commands:\n- name "YOUR_NAME"\n- email "YOUR_EMAIL"\n- message "YOUR_MESSAGE"\n- send (submits form)\n- clear (resets terminal)\n- help (shows this list)' });

    } else if (trimmedCmd.startsWith('name')) {
      if (value) {
        setFormData(prev => ({ ...prev, name: value }));
        addLog({ type: 'system', content: `Name set to: ${value}` });
      } else {
        addLog({ type: 'error', content: 'Usage: name "Your Name"' });
      }

    } else if (trimmedCmd.startsWith('email')) {
      if (validateEmail(value)) {
        setFormData(prev => ({ ...prev, email: value }));
        addLog({ type: 'system', content: `Email set to: ${value}` });
      } else {
        addLog({ type: 'error', content: 'Invalid email format. Please use name@domain.com' });
      }

    } else if (trimmedCmd.startsWith('message')) {
      if (value) {
        setFormData(prev => ({ ...prev, message: value }));
        addLog({ type: 'system', content: 'Message stored. Ready to send.' });
      } else {
        addLog({ type: 'error', content: 'Usage: message "Your message here"' });
      }

    } else if (trimmedCmd === 'send') {
      if (!formData.name || !formData.email || !formData.message) {
        addLog({ type: 'error', content: 'Incomplete. Set name, email, and message first.' });
        return;
      }

      if (isSending) return;
      setIsSending(true);
      addLog({ type: 'system', content: `Sending message from ${formData.name}...` });

      try {
        // Real email via Formspree — replace FORM_ID with your Formspree form ID.
        // Sign up free at formspree.io, create a form, copy the ID.
        const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

        if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
          // Dev fallback: show instructions if Formspree not configured
          addLog({ type: 'error', content: 'Contact form not yet configured. Email directly: ibrahimsalman.dev@gmail.com' });
          setIsSending(false);
          return;
        }

        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
        });

        if (res.ok) {
          addLog({ type: 'success', content: '✓ [200 OK] Message delivered. I will reply within 24 hours.' });
          setFormData({ name: '', email: '', message: '' });
        } else {
          addLog({ type: 'error', content: `Delivery failed [${res.status}]. Try emailing directly: ibrahimsalman.dev@gmail.com` });
        }
      } catch {
        addLog({ type: 'error', content: 'Network error. Try emailing directly: ibrahimsalman.dev@gmail.com' });
      } finally {
        setIsSending(false);
      }

    } else if (trimmedCmd === 'clear') {
      setLogs([{ type: 'system', content: 'Terminal cleared.' }]);
    } else {
      addLog({ type: 'error', content: `Unknown command: ${trimmedCmd}. Type "help" for available commands.` });
    }
  }, [formData, isSending, addLog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addLog({ type: 'input', content: input });
    setHistory(prev => [input, ...prev]);
    processCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col gap-2 mb-12 items-center text-center">
          <span className="eyebrow">Contact</span>
          <h2 className="text-4xl font-syne font-bold text-text-1 text-wrap-balance">Let&apos;s build something</h2>
        </div>

        <div
          className="bg-[#0E0E1A] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Mac-style header bar */}
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2 text-text-3 text-[10px] uppercase tracking-widest font-mono">
              <TerminalIcon className="w-3 h-3" />
              bash — 80x24
            </div>
            <div className="w-12" />
          </div>

          {/* Terminal Content */}
          <div
            ref={scrollRef}
            className="h-[400px] p-6 font-mono text-[13px] overflow-y-auto custom-scrollbar leading-relaxed"
          >
            {logs.map((log, i) => (
              <div key={i} className="mb-2 whitespace-pre-wrap">
                {log.type === 'input' && (
                  <span className="text-text-3 mr-2">
                    <span className="text-accent">$</span> guest@portfolio:~$
                    <span className="text-green ml-2">{log.content}</span>
                  </span>
                )}
                {log.type === 'system' && <span className="text-[#A594F9]">{log.content}</span>}
                {log.type === 'error' && <span className="text-red">! {log.content}</span>}
                {log.type === 'success' && <span className="text-green">{log.content}</span>}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-text-3 flex-shrink-0">
                <span className="text-accent">$</span> guest@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSending}
                className="bg-transparent border-none outline-none text-green ml-2 flex-grow font-mono disabled:opacity-50"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command"
              />
            </form>
          </div>
        </div>

        {/* Social Links — real URLs */}
        <div className="mt-12 flex justify-center gap-8">
          <a
            href="https://github.com/devhms"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-mono">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/ibrahimsalman"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-mono">LinkedIn</span>
          </a>
          <a
            href="mailto:ibrahimsalman.dev@gmail.com"
            data-magnetic
            className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-mono">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
