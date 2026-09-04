import { useState, useEffect } from 'react';
import { QuoteRequest, DemoBooking, ServiceTicket } from '../types';
import { 
  FileText, 
  Calendar, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Phone, 
  Building2, 
  MapPin, 
  RefreshCw 
} from 'lucide-react';

interface LeadBoardProps {
  onRefresh?: () => void;
}

export function LeadBoard({ onRefresh }: LeadBoardProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [demos, setDemos] = useState<DemoBooking[]>([]);
  const [services, setServices] = useState<ServiceTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'quotes' | 'demos' | 'services'>('quotes');

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setQuotes(data.quotes || []);
        setDemos(data.demos || []);
        setServices(data.services || []);
      }
    } catch (e) {
      console.error('Failed to load leads:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      {/* Header and Subtabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-black uppercase italic font-display text-zinc-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-500" />
            Operational CRM & Voice Inquiries
          </h3>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Real-time tickets and quotation requests automatically captured by Adesh during voice calls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-refresh-crm"
            onClick={fetchLeads}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-800"
            title="Refresh lead data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-orange-500' : 'text-orange-500'}`} />
            <span>SYNC</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('quotes')}
          className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'quotes'
              ? 'bg-orange-500 text-black font-black shadow-md'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Quotations</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-sm text-[10px] bg-black/20 font-mono font-black">
            {quotes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('demos')}
          className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'demos'
              ? 'bg-orange-500 text-black font-black shadow-md'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>On-Site Demos & Trials</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-sm text-[10px] bg-black/20 font-mono font-black">
            {demos.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('services')}
          className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'services'
              ? 'bg-orange-500 text-black font-black shadow-md'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Service & Maintenance</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-sm text-[10px] bg-black/20 font-mono font-black">
            {services.length}
          </span>
        </button>
      </div>

      {/* Content for Quotations */}
      {activeSubTab === 'quotes' && (
        <div className="space-y-3">
          {quotes.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/40 rounded-sm border border-zinc-800 text-zinc-400 text-xs font-mono uppercase">
              No quotes logged yet. Ask Adesh for a machinery quotation during a voice call.
            </div>
          ) : (
            quotes.map((q) => (
              <div
                key={q.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-orange-500 px-2 py-0.5 rounded-sm bg-zinc-950 border border-zinc-800">
                      {q.id}
                    </span>
                    <span className="text-base font-black uppercase italic font-display text-zinc-100">{q.companyName}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {q.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-200 font-medium">
                    Requested: <strong className="text-orange-400">{q.machineOrItem}</strong>
                    {q.quantity && <span className="text-zinc-400 ml-1 font-mono">({q.quantity} unit(s))</span>}
                  </p>

                  {q.specifications && (
                    <p className="text-[11px] text-zinc-400 font-mono">Specs: {q.specifications}</p>
                  )}

                  {q.notes && (
                    <p className="text-[11px] text-zinc-400 italic">"{q.notes}"</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-orange-500" />
                      {q.contactPhone}
                    </span>
                    {q.deliveryLocation && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        {q.deliveryLocation}
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-400">
                      {new Date(q.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ROUTED TO SALES ENG.
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Content for Demos */}
      {activeSubTab === 'demos' && (
        <div className="space-y-3">
          {demos.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/40 rounded-sm border border-zinc-800 text-zinc-400 text-xs font-mono uppercase">
              No on-site demo trials scheduled yet. Ask Adesh to schedule a trial demo.
            </div>
          ) : (
            demos.map((d) => (
              <div
                key={d.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-orange-500 px-2 py-0.5 rounded-sm bg-zinc-950 border border-zinc-800">
                      {d.id}
                    </span>
                    <span className="text-base font-black uppercase italic font-display text-zinc-100">{d.companyName}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">
                      {d.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-200 font-medium">
                    Demo Machine: <strong className="text-orange-400">{d.machineModel}</strong>
                  </p>

                  <p className="text-[11px] text-zinc-300 font-mono">
                    Preferred Window: <strong className="text-zinc-100">{d.preferredDate}</strong>
                  </p>

                  {d.trialScope && (
                    <p className="text-[11px] text-zinc-400 font-mono">Evaluation Scope: {d.trialScope}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-orange-500" />
                      {d.contactPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {d.facilityLocation}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end gap-1 text-right font-mono">
                  <span className="text-xs font-bold text-orange-400 uppercase">ON-SITE TRIAL</span>
                  <span className="text-[10px] text-zinc-400">100% CREDITED TO PURCHASE</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Content for Service */}
      {activeSubTab === 'services' && (
        <div className="space-y-3">
          {services.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/40 rounded-sm border border-zinc-800 text-zinc-400 text-xs font-mono uppercase">
              No service tickets open. Existing clients can report maintenance issues directly to Adesh.
            </div>
          ) : (
            services.map((s) => (
              <div
                key={s.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-orange-500 px-2 py-0.5 rounded-sm bg-zinc-950 border border-zinc-800">
                      {s.id}
                    </span>
                    <span className="text-base font-black uppercase italic font-display text-zinc-100">{s.companyName}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm border font-bold ${
                      s.urgency === 'Emergency Breakdown'
                        ? 'bg-red-950/60 text-red-400 border-red-800/80'
                        : s.urgency === 'Priority Repair'
                        ? 'bg-orange-950/60 text-orange-400 border-orange-800/80'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-750'
                    }`}>
                      {s.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-200 font-medium">
                    Equipment: <strong className="text-zinc-100">{s.machineModel}</strong>
                  </p>

                  <p className="text-[11px] text-zinc-300">
                    Reported Issue: <span className="text-red-400 font-mono">{s.issueDescription}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-orange-500" />
                      {s.contactPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      {s.preferredDate || 'Earliest slot'}
                    </span>
                    <span className="text-emerald-400 font-bold uppercase">Status: {s.status}</span>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end gap-1.5">
                  <span className="text-xs font-black px-3 py-1 rounded-sm bg-zinc-800 text-orange-400 border border-zinc-700 uppercase font-mono">
                    TECH DISPATCHED
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
