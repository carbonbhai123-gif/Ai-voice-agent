import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, PhoneCall, Award } from 'lucide-react';
import { DEMO_PROGRAM_INFO } from '../data/catalog';

interface DemoProgramCardProps {
  onAskAdesh: (prompt: string) => void;
}

export function DemoProgramCard({ onAskAdesh }: DemoProgramCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 sm:p-10 relative overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-orange-500" />
            GANESH ENTERPRISES SHOP-FLOOR GUARANTEE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tight text-zinc-100 font-display leading-tight">
            {DEMO_PROGRAM_INFO.title}
          </h2>

          <p className="text-sm sm:text-base text-orange-400/90 font-mono uppercase tracking-wider font-bold">
            {DEMO_PROGRAM_INFO.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            Committing to high-output CNC machinery, press brakes, or fiber lasers is a major capital investment. Ganesh Enterprises removes the risk with our dedicated <strong className="text-zinc-100">Shop-Floor Trial Evaluation</strong>. We deliver and commission an evaluation unit or host an in-depth trial cutting run with your specific materials and CAD files before purchase sign-off.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {DEMO_PROGRAM_INFO.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-sm bg-zinc-950 border border-zinc-800 text-xs text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-mono">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono uppercase text-zinc-400 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>SETUP WINDOW: <strong className="text-zinc-200">{DEMO_PROGRAM_INFO.averageSetupTime}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>FEE STRUCTURE: <strong className="text-zinc-200">{DEMO_PROGRAM_INFO.trialFee}</strong></span>
            </div>
          </div>

          <div className="pt-3">
            <button
              id="btn-call-demo-booking"
              onClick={() => onAskAdesh("I'd like to book an on-site equipment trial demo for our factory. Can you guide me through the machine options and schedule?")}
              className="px-8 py-3.5 rounded-sm bg-orange-500 hover:bg-orange-400 text-black font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 transition-all cursor-pointer shadow-xl shadow-orange-950/40"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CONNECT WITH ADESH TO SCHEDULE DEMO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
