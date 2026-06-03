import { useState, useRef, useEffect } from 'react';
import { AI_FAQ } from '../../data/sampleData';

function findAnswer(query) {
  const q = query.toLowerCase();
  for (const item of AI_FAQ) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return item.answer;
    }
  }
  return "I'm sorry, I don't have a specific answer for that. Please contact the Alumni & Development Office at **alumni@mcc.edu.in** or call **+91-44-2367-4641** for assistance.";
}

function renderMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm **MCC Assist**, your alumni portal guide. Ask me anything about donations, reunions, CSR, profile updates, or the college! 🏛️" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: answer }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  const QUICK = ['How to donate?', 'Upcoming reunions?', 'Contact office', 'Update profile'];

  return (
    <>
      {/* Floating button */}
      <button
        id="ai-assistant-btn"
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #1c1b3b, #eabd53)',
          boxShadow: '0 4px 24px rgba(28,27,59,0.6), 0 0 0 4px rgba(234,189,83,0.15)'
        }}
        aria-label="Open AI Assistant"
      >
        <span className="text-2xl">{open ? '✕' : '🤖'}</span>
      </button>

      {/* Chat window */}
      {open && (
        <div
          id="ai-chat-window"
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col animate-fade-in overflow-hidden"
          style={{ height: '480px', background: '#111027', border: '1px solid #2e2d5c' }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1c1b3b, #25255f)', borderBottom: '1px solid #2e2d5c' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
              style={{ background: 'rgba(234,189,83,0.15)', border: '1px solid rgba(234,189,83,0.3)' }}>
              🤖
            </div>
            <div>
              <div className="text-sm font-semibold text-[#f0ecff]">MCC Assist</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                <span className="text-[10px]" style={{ color: '#9e8a7a' }}>AI Alumni Guide · Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5"
                    style={{ background: '#1c1b3b', border: '1px solid #2e2d5c' }}>🤖</div>
                )}
                <div
                  className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                  dangerouslySetInnerHTML={{ __html: renderMd(msg.text) }}
                />
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-1.5 ml-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9e8a7a] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#9e8a7a] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#9e8a7a] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap flex-shrink-0">
            {QUICK.map(q => (
              <button key={q} onClick={() => { setInput(q); }}
                className="text-[10px] px-2.5 py-1 rounded-full transition-colors"
                style={{ background: 'rgba(28,27,59,0.3)', border: '1px solid rgba(234,189,83,0.15)', color: '#eabd53' }}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything about MCC…"
              className="input flex-1 text-sm"
              style={{ background: '#221518' }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || typing}
              className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-all"
              style={{ background: 'linear-gradient(135deg, #1c1b3b, #2e2e7a)' }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
