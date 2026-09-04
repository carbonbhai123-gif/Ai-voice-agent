import { useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Copy, 
  Trash2, 
  Check, 
  Cpu, 
  FileText, 
  Calendar, 
  Wrench,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { TranscriptItem } from '../types';

interface TranscriptViewProps {
  transcripts: TranscriptItem[];
  onClear: () => void;
}

export function TranscriptView({ transcripts, onClear }: TranscriptViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transcripts]);

  const handleCopy = () => {
    const text = transcripts
      .map((t) => `[${t.timestamp}] ${t.speaker === 'adesh' ? 'Adesh (Ganesh Ent.)' : t.speaker === 'caller' ? 'Caller' : 'System'}: ${t.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm flex flex-col h-[520px] shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-none bg-orange-500" />
          <span className="text-xs font-mono font-black text-zinc-100 uppercase tracking-widest">
            CALL TELEMETRY & TRANSCRIPT
          </span>
          <span className="text-[10px] font-mono text-orange-500 font-bold">({transcripts.length} entries)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-copy-transcript"
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer border border-zinc-800"
            title="Copy call transcript"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-orange-500" />}
            <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
          </button>

          <button
            id="btn-clear-transcript"
            onClick={onClear}
            className="px-2.5 py-1 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer border border-zinc-800"
            title="Clear transcript"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PURGE</span>
          </button>
        </div>
      </div>

      {/* Transcript Messages Scroll Area */}
      <div 
        ref={containerRef}
        className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 font-sans text-sm"
      >
        {transcripts.map((item) => {
          if (item.speaker === 'system') {
            const isCrmEvent = item.text.includes('[CRM Event]');
            return (
              <div key={item.id} className="flex justify-center my-2">
                <div className={`text-xs px-3 py-1 rounded-sm border max-w-lg text-center flex items-center gap-2 font-mono ${
                  isCrmEvent
                    ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}>
                  {isCrmEvent ? <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0" /> : <Cpu className="w-3.5 h-3.5 shrink-0" />}
                  <span>{item.text}</span>
                  <span className="text-[10px] text-zinc-500 ml-1">{item.timestamp}</span>
                </div>
              </div>
            );
          }

          const isAdesh = item.speaker === 'adesh';

          return (
            <div
              key={item.id}
              className={`flex items-start gap-2.5 ${isAdesh ? 'justify-start' : 'justify-end'}`}
            >
              {isAdesh && (
                <div className="w-7 h-7 rounded-sm bg-orange-600/15 border border-orange-500 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] rounded-sm px-3.5 py-2.5 shadow-md ${
                isAdesh
                  ? 'bg-zinc-900 text-zinc-100 border border-zinc-800'
                  : 'bg-orange-500 text-black font-semibold'
              }`}>
                <div className="flex items-center justify-between gap-3 mb-1 text-[10px] font-mono tracking-wider uppercase">
                  <span className={`font-black ${isAdesh ? 'text-orange-500' : 'text-black font-black'}`}>
                    {isAdesh ? 'ADESH • GANESH ENTERPRISES' : 'CALLER INQUIRY'}
                  </span>
                  <span className={`font-bold ${isAdesh ? 'text-zinc-500' : 'text-black/70'}`}>
                    {item.timestamp}
                  </span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap text-xs sm:text-sm">{item.text}</p>
              </div>

              {!isAdesh && (
                <div className="w-7 h-7 rounded-sm bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rules Notice Footer */}
      <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center justify-between uppercase">
        <span>PROTOCOL: 1–3 SHORT SENTENCES • HINDI / ENGLISH / HINGLISH AUTO-MIRROR</span>
        <span className="text-orange-500 font-bold">PCM 24KHZ</span>
      </div>
    </div>
  );
}
