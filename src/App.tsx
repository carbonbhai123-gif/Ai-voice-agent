import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CallConsole } from './components/CallConsole';
import { TranscriptView } from './components/TranscriptView';
import { CatalogView } from './components/CatalogView';
import { LeadBoard } from './components/LeadBoard';
import { DemoProgramCard } from './components/DemoProgramCard';
import { useVoiceCall } from './hooks/useVoiceCall';
import { 
  Building2, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'call' | 'catalog' | 'crm' | 'demoInfo'>('call');
  const [leadCount, setLeadCount] = useState<number>(3);

  const fetchLeadCount = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        const total = (data.quotes?.length || 0) + (data.demos?.length || 0) + (data.services?.length || 0);
        setLeadCount(total);
      }
    } catch {
      // Ignore count fetch errors
    }
  };

  useEffect(() => {
    fetchLeadCount();
  }, []);

  const {
    callState,
    isMuted,
    duration,
    transcripts,
    activities,
    micLevel,
    aiLevel,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
    interrupt,
    sendTextMessage,
    clearTranscript,
  } = useVoiceCall(() => {
    fetchLeadCount();
  });

  const handleAskAdesh = (prompt: string) => {
    setActiveTab('call');
    startCall(prompt);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-black font-sans">
      {/* Top Navigation & Brand Header */}
      <Header
        callState={callState}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        leadCount={leadCount}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Notice Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-2.5 rounded-sm bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-orange-500 shrink-0" />
            <span className="font-mono text-xs">
              <strong className="text-zinc-100 uppercase">INDUSTRIAL VOICE HOTLINE:</strong> Speak in English, Hindi (हिंदी), or Hinglish • Adesh mirrors your language in real-time.
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
            <span className="w-2 h-2 rounded-none bg-emerald-400"></span>
            GEMINI LIVE AUDIO API ACTIVE
          </div>
        </div>

        {/* Tab 1: Live Voice Call Console & Transcript */}
        {activeTab === 'call' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Telephone Console (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              <CallConsole
                callState={callState}
                duration={duration}
                isMuted={isMuted}
                micLevel={micLevel}
                aiLevel={aiLevel}
                errorMessage={errorMessage}
                onStartCall={startCall}
                onEndCall={endCall}
                onToggleMute={toggleMute}
                onInterrupt={interrupt}
                onSendMessage={sendTextMessage}
              />

              {/* Real-time Activity Feed / Recent Action Badges */}
              {activities.length > 0 && (
                <div className="p-4 rounded-sm bg-zinc-900/40 border border-zinc-800 space-y-2 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-mono font-black text-zinc-200 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-orange-400">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                      LIVE ACTION LOG (CRM SYNCED)
                    </span>
                    <button
                      onClick={() => setActiveTab('crm')}
                      className="text-[11px] text-orange-400 hover:text-orange-300 hover:underline cursor-pointer uppercase"
                    >
                      VIEW IN CRM →
                    </button>
                  </div>

                  <div className="space-y-1.5 font-mono">
                    {activities.slice(0, 3).map((act) => (
                      <div
                        key={act.id}
                        className="p-2.5 rounded-sm bg-zinc-950 border border-zinc-800 text-xs flex items-start justify-between gap-3"
                      >
                        <div>
                          <p className="font-bold text-zinc-100">{act.title}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{act.details}</p>
                        </div>
                        <span className="text-[10px] text-zinc-500 shrink-0">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Transcript Viewer (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              <TranscriptView
                transcripts={transcripts}
                onClear={clearTranscript}
              />

              {/* Quick Persona Info Card */}
              <div className="p-4 rounded-sm bg-zinc-900/40 border border-zinc-800 text-xs space-y-2 text-zinc-300 backdrop-blur-md">
                <div className="flex items-center justify-between font-mono font-black uppercase text-zinc-200 tracking-wider">
                  <span>REPRESENTATIVE ADESH</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-sm bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    AI SALES & SUPPORT
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Adesh greets callers with <span className="text-zinc-200 font-semibold font-mono">"Hello, I am Adesh from Ganesh Enterprises, how can I help you?"</span> and responds in your preferred language — <strong>English, Hindi (हिंदी), or Hinglish</strong>. He handles machinery specifications, trial demos, quotes, and emergency technician dispatch.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Machinery & Hardware Catalog */}
        {activeTab === 'catalog' && (
          <CatalogView onAskAdesh={handleAskAdesh} />
        )}

        {/* Tab 3: Special Demo & Trial Program Details */}
        {activeTab === 'demoInfo' && (
          <DemoProgramCard onAskAdesh={handleAskAdesh} />
        )}

        {/* Tab 4: Quotes, Demos & Service CRM */}
        {activeTab === 'crm' && (
          <LeadBoard onRefresh={fetchLeadCount} />
        )}
      </main>

      {/* Industrial Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 text-xs font-mono py-6 mt-12">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-black text-zinc-200">GANESH ENTERPRISES</span>
            <span>•</span>
            <span>HEAVY MACHINERY & INDUSTRIAL HARDWARE</span>
            <span>•</span>
            <span className="text-orange-500 font-bold">ISO 9001:2015</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <span>HOTLINE: +91 (020) 2448-8000</span>
            <span>•</span>
            <span>SUPPORT@GANESHENTERPRISES.IND.IN</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
