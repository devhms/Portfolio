'use client';

import { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = cmd.split('"');
    const value = parts[1] || '';

    if (trimmedCmd === 'help') {
      setLogs(prev => [...prev, { type: 'system', content: 'Available commands:\n- name "YOUR_NAME"\n- email "YOUR_EMAIL"\n- message "YOUR_MESSAGE"\n- send (submits form)\n- clear (resets terminal)\n- help (shows this list)' }]);
    } else if (trimmedCmd.startsWith('name')) {
      if (value) {
        setFormData(prev => ({ ...prev, name: value }));
        setLogs(prev => [...prev, { type: 'system', content: `Name set to: ${value}` }]);
      } else {
        setLogs(prev => [...prev, { type: 'error', content: 'Usage: name "Your Name"' }]);
      }
    } else if (trimmedCmd.startsWith('email')) {
      if (validateEmail(value)) {
        setFormData(prev => ({ ...prev, email: value }));
        setLogs(prev => [...prev, { type: 'system', content: `Email set to: ${value}` }]);
      } else {
        setLogs(prev => [...prev, { type: 'error', content: 'Invalid email format. Please use name@domain.com' }]);
      }
    } else if (trimmedCmd.startsWith('message')) {
      if (value) {
        setFormData(prev => ({ ...prev, message: value }));
        setLogs(prev => [...prev, { type: 'system', content: `Message stored. Ready to send.` }]);
      } else {
        setLogs(prev => [...prev, { type: 'error', content: 'Usage: message "Your message here"' }]);
      }
    } else if (trimmedCmd === 'send') {
      if (!formData.name || !formData.email || !formData.message) {
        setLogs(prev => [...prev, { type: 'error', content: 'Incomplete form. Ensure name, email, and message are set.' }]);
      } else {
        setLogs(prev => [...prev, { type: 'system', content: `Preparing to transmit message from ${formData.name}...` }]);
        
        const steps = [
          'Handshaking with API gateway (127.0.0.1:443)...',
          'Encrypting payload with RSA-4096...',
          'Transmitting packets...',
          'Waiting for server acknowledgment...'
        ];
        
        steps.forEach((step, index) => {
          setTimeout(() => {
            setLogs(prev => [...prev, { type: 'system', content: step }]);
          }, (index + 1) * 600);
        });

        setTimeout(() => {
          setLogs(prev => [...prev, { type: 'success', content: '✓ [200 OK] Message successfully delivered to ibrahimsalman.dev' }]);
          setLogs(prev => [...prev, { type: 'system', content: 'I will reply within 24 hours. Connection terminated.' }]);
          setFormData({ name: '', email: '', message: '' });
        }, 3500);
      }
    } else if (trimmedCmd === 'clear') {
      setLogs([{ type: 'system', content: 'Terminal cleared.' }]);
    } else {
      setLogs(prev => [...prev, { type: 'error', content: `Unknown command: ${trimmedCmd}. Type "help" for a list of commands.` }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLogs(prev => [...prev, { type: 'input', content: input }]);
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
          {/* Mac Header */}
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
                {log.type === 'success' && <span className="text-green">✓ {log.content}</span>}
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
                className="bg-transparent border-none outline-none text-green ml-2 flex-grow font-mono"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command"
              />
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-8">
          <a href="https://github.com/hafizmuhammadibrahimsalman-create" target="_blank" rel="noopener noreferrer" data-magnetic className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors">
            <Github className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-mono">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/ibrahimsalman" target="_blank" rel="noopener noreferrer" data-magnetic className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors">
            <Linkedin className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-mono">LinkedIn</span>
          </a>
          <a href="mailto:ibrahimsalman.dev@gmail.com" data-magnetic className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors">
            <Mail className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-mono">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
