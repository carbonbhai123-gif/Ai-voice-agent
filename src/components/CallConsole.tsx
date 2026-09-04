import React, { useState } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Hand, 
  Send, 
  Sparkles, 
  Shield, 
  Wrench, 
  Factory,
  Radio,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Cpu,
  Languages,
  Globe
} from 'lucide-react';
import { CallState } from '../types';
import { SAMPLE_CALLER_PROMPTS, SamplePrompt } from '../data/catalog';

interface CallConsoleProps {
  callState: CallState;
  duration: number;
  isMuted: boolean;
  micLevel: number;
  aiLevel: number;
  errorMessage: string | null;
  onStartCall: (prompt?: string) => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onInterrupt: () => void;
  onSendMessage: (text: string) => void;
}

export function CallConsole({
  callState,
  duration,
  isMuted,
  micLevel,
  aiLevel,
  errorMessage,
  onStartCall,
  onEndCall,
  onToggleMute,
  onInterrupt,
  onSendMessage,
}: CallConsoleProps) {
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState<'All' | 'English' | 'Hinglish' | 'Hindi'>('All');

  const isCallActive = callState === 'connected' || callState === 'speaking' || callState === 'listening';
  const isSpeaking = callState === 'speaking';
  const isListening = callState === 'listening';

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (!isCallActive) {
      onStartCall(inputText.trim());
    } else {
      onSendMessage(inputText.trim());
    }
    setInputText('');
  };

  const handlePromptClick = (promptText: string) => {
    if (!isCallActive) {
      onStartCall(promptText);
    } else {
      onSendMessage(promptText);
    }
  };

  const filteredPrompts = selectedLang === 'All' 
    ? SAMPLE_CALLER_PROMPTS 
    : SAMPLE_CALLER_PROMPTS.filter((p) => p.language === selectedLang);

  // Dynamic audio frequency heights
  const activeLevel = isSpeaking ? aiLevel : (isMuted ? 0 : micLevel);
  const bars = [0.35, 0.65, 0.95, 1.0, 0.8, 0.55, 0.75, 1.0, 0.45, 0.85, 0.6, 0.4];

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Top Telemetry & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            {isCallActive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </>
            ) : callState === 'connecting' ? (
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-400 animate-pulse"></span>
            ) : (
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-zinc-600"></span>
            )}
          </span>

          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
              {callState === 'idle' && 'VOICE TRUNK: STANDBY • READY TO GREET'}
              {callState === 'connecting' && 'CONNECTING TO ADESH (GEMINI LIVE)...'}
              {callState === 'speaking' && 'ADESH TRANSMITTING (AUDIO OUT)'}
              {callState === 'listening' && (isMuted ? 'MIC MUTED' : 'LISTENING (HINDI / ENGLISH / HINGLISH)')}
              {callState === 'interrupted' && 'BARGE-IN / CALLER INTERRUPT'}
              {callState === 'ended' && 'LINE RELEASED / CALL ENDED'}
              {callState === 'error' && 'CONNECTION NOTICE'}
            </div>
            <div className="text-sm font-black tracking-tight text-zinc-100 uppercase italic font-display flex items-center gap-2 flex-wrap">
              <span>REP: <strong className="text-orange-500">ADESH</strong> • INDUSTRIAL SALES & SUPPORT</span>
              <span className="text-[10px] font-mono not-italic px-2 py-0.5 rounded-sm bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-orange-500" />
                English • हिंदी • Hinglish
              </span>
            </div>
          </div>
        </div>

        {/* Big Monospace Timer */}
        <div className="font-mono text-base font-black px-4 py-1.5 rounded-sm bg-zinc-950 border border-zinc-800 text-orange-400 tracking-wider">
          {formatDuration(duration)}
        </div>
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="my-4 p-3.5 rounded-sm bg-red-950/40 border-l-4 border-red-600 text-red-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-black uppercase tracking-wider">{errorMessage}</p>
            <p className="text-red-300/80 text-[11px] mt-0.5 font-mono">
              You can still click the sample inquiries below to interact with Adesh via text & audio fallback!
            </p>
          </div>
        </div>
      )}

      {/* Bold Typography Centerpiece: Headline Quote & Visualizer */}
      <div className="py-8 sm:py-10 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-mono text-orange-500 uppercase tracking-[0.25em] font-bold mb-3 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-orange-500" />
          {isCallActive ? 'LIVE CALL SESSION ACTIVE' : 'VOICE TRUNK READY'}
        </span>

        {/* Dynamic Display Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight italic font-display text-zinc-100 max-w-3xl">
          {isSpeaking ? (
            <span className="text-orange-400">"Adesh is responding to your inquiry..."</span>
          ) : isListening && !isMuted ? (
            <span>"Listening... Speak in Hindi, English, or Hinglish"</span>
          ) : isCallActive ? (
            <span>"Connected to Ganesh Enterprises Hotline"</span>
          ) : (
            <span className="text-orange-400">
              "Hello, I am Adesh from Ganesh Enterprises, how can I help you?"
            </span>
          )}
        </h2>
        <p className="text-xs font-mono text-zinc-400 mt-2 max-w-lg">
          Adesh detects whether you speak in Hindi (हिंदी), English, or Hinglish and mirrors your language in real-time.
        </p>

        {/* Audio Frequency Bars in Bold Industrial Style */}
        <div className="h-12 mt-6 sm:mt-8 flex items-end justify-center gap-2 w-full max-w-sm">
          {bars.map((scale, i) => {
            const dynamicHeight = isCallActive
              ? Math.max(6, Math.min(44, activeLevel * scale * 48 + Math.random() * 4))
              : 6;

            const barColor = isSpeaking 
              ? 'bg-orange-500' 
              : isListening && !isMuted
              ? 'bg-emerald-500'
              : 'bg-zinc-800';

            return (
              <div
                key={i}
                className={`w-2 sm:w-2.5 rounded-none transition-all duration-75 ${barColor}`}
                style={{ height: `${dynamicHeight}px` }}
              />
            );
          })}
        </div>

        {/* Telemetry Indicator */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            LATENCY: 85MS
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-orange-500" />
            AUTO MIRROR: HINDI / ENGLISH / HINGLISH
          </span>
          <span>•</span>
          <span>AUDIO: 16K/24K DUPLEX</span>
        </div>
      </div>

      {/* Primary Action Buttons in Bold Brutalist Style */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 pb-6 border-t border-zinc-800">
        {!isCallActive ? (
          <button
            id="btn-start-call"
            onClick={() => onStartCall()}
            disabled={callState === 'connecting'}
            className="flex items-center gap-3 px-8 py-3.5 rounded-sm bg-orange-500 hover:bg-orange-400 text-black font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl shadow-orange-950/50 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>{callState === 'connecting' ? 'DIALING...' : 'CALL ADESH (AI REP)'}</span>
          </button>
        ) : (
          <>
            {/* Mute Button */}
            <button
              id="btn-toggle-mute"
              onClick={onToggleMute}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              className={`px-4 py-3 rounded-sm border font-mono uppercase tracking-wider text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isMuted
                  ? 'bg-orange-500 text-black border-orange-400 font-black'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4 text-black" /> : <Mic className="w-4 h-4" />}
              <span>{isMuted ? 'UNMUTE MIC' : 'MUTE MIC'}</span>
            </button>

            {/* Interrupt Barge-In Button */}
            <button
              id="btn-interrupt-call"
              onClick={onInterrupt}
              title="Interrupt and speak now"
              className="px-4 py-3 rounded-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Hand className="w-4 h-4 text-orange-500" />
              <span>INTERRUPT / BARGE IN</span>
            </button>

            {/* End Call Button */}
            <button
              id="btn-end-call"
              onClick={onEndCall}
              className="flex items-center gap-2 px-6 py-3 rounded-sm bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-950/50 active:scale-98 transition-all cursor-pointer"
            >
              <PhoneOff className="w-4 h-4" />
              <span>DISCONNECT</span>
            </button>
          </>
        )}
      </div>

      {/* Special Offer Highlight Banner */}
      <div className="bg-orange-500 text-black p-4 sm:p-5 rounded-sm my-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono font-black uppercase tracking-widest text-black/80 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-black" />
            ON-SITE TRIAL GUARANTEE • ऑन-साइट ट्रायल पैकेज
          </div>
          <div className="text-lg sm:text-xl font-black uppercase italic font-display leading-tight mt-0.5">
            Low-Cost Trial Package for Machinery Evaluation
          </div>
          <div className="text-xs font-medium text-black/90 mt-1 max-w-xl">
            Test cutting speed, hydraulic force, or CNC tolerance on your workpieces before capital expenditure.
          </div>
        </div>

        <button
          onClick={() => handlePromptClick("Tell me about the On-Site Demo or Trial Package for industrial machinery")}
          className="shrink-0 px-4 py-2 bg-black hover:bg-zinc-900 text-white font-mono uppercase tracking-wider text-xs font-black rounded-sm cursor-pointer"
        >
          Ask Adesh →
        </button>
      </div>

      {/* Suggested Inquiries / Caller Scenarios with Language Filter */}
      <div className="pt-4 border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            QUICK INQUIRIES (TAP TO TEST IN HINDI / ENGLISH / HINGLISH):
          </span>

          {/* Language Selector Filter */}
          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-1 rounded-sm text-[11px] font-mono">
            {(['All', 'English', 'Hinglish', 'Hindi'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2 py-0.5 rounded-xs transition-all cursor-pointer font-bold uppercase ${
                  selectedLang === lang
                    ? 'bg-orange-500 text-black'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {lang === 'Hindi' ? 'हिंदी' : lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredPrompts.map((sample, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handlePromptClick(sample.prompt)}
              className="text-left p-3 rounded-sm bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition-all text-xs group cursor-pointer"
            >
              <div className="font-black uppercase tracking-tight italic font-display text-zinc-200 group-hover:text-orange-400 flex items-center justify-between gap-2">
                <span className="truncate">{sample.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border shrink-0 ${
                  sample.language === 'Hindi'
                    ? 'bg-amber-950/40 text-amber-400 border-amber-800/60'
                    : sample.language === 'Hinglish'
                    ? 'bg-orange-950/40 text-orange-400 border-orange-800/60'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                }`}>
                  {sample.language === 'Hindi' ? 'हिंदी' : sample.language}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono line-clamp-2 leading-relaxed">
                "{sample.prompt}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Text message fallback input */}
      <form onSubmit={handleTextSubmit} className="mt-4 pt-4 border-t border-zinc-800 flex gap-2">
        <input
          id="input-voice-text-fallback"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isCallActive ? "Type message in English, Hindi (हिंदी), or Hinglish..." : "Type inquiry in English, Hindi (हिंदी), or Hinglish..."}
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-orange-500"
        />
        <button
          id="btn-send-text-inquiry"
          type="submit"
          className="px-5 py-2.5 rounded-sm bg-orange-500 hover:bg-orange-400 text-black font-black uppercase tracking-wider text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SEND</span>
        </button>
      </form>
    </div>
  );
}
