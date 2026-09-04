import { useState } from 'react';
import { CATALOG_ITEMS, DEMO_PROGRAM_INFO } from '../data/catalog';
import { CatalogItem, ProductCategory } from '../types';
import { 
  CheckCircle2, 
  PhoneCall, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

interface CatalogViewProps {
  onAskAdesh: (machineName: string) => void;
}

export function CatalogView({ onAskAdesh }: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Industrial Machinery',
    'Fabrication & Cutting',
    'Power Tools & Hardware',
    'Spares, Bearings & Fittings',
  ];

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.modelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner on Demo Program */}
      <div className="bg-orange-500 text-black rounded-sm p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-sm bg-black text-orange-400 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              SPECIAL TRIAL OFFER
            </span>
            <span className="text-xs text-black/80 font-mono font-bold uppercase tracking-wider">GANESH ENTERPRISES POLICY</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter text-black font-display leading-tight">
            Equipment On-Site Demo & Low-Cost Trial Package
          </h3>
          <p className="text-xs sm:text-sm text-black/90 max-w-2xl font-medium leading-relaxed">
            "We offer initial machine demos and low-cost trial runs so you can test equipment performance with your actual workpieces before committing to a full purchase."
          </p>
        </div>

        <button
          id="btn-banner-ask-trial"
          onClick={() => onAskAdesh("I'd like to ask about your Equipment On-Site Demo and Trial Package for machinery")}
          className="shrink-0 px-5 py-3 rounded-sm bg-black hover:bg-zinc-900 text-white font-mono font-black uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
        >
          <PhoneCall className="w-4 h-4 text-orange-500" />
          <span>ASK ADESH ON CALL</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-sm text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-black font-black shadow-md'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH MODELS, SPECS..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-sm pl-9 pr-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Machinery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-sm p-5 sm:p-6 flex flex-col justify-between transition-all group backdrop-blur-md"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-black px-2 py-0.5 rounded-sm bg-zinc-950 text-orange-500 border border-zinc-800">
                  {item.modelCode}
                </span>
                <div className="flex items-center gap-2">
                  {item.demoAvailable && (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-emerald-950/40 text-emerald-400 border border-emerald-800/80 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      DEMO TRIAL READY
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">
                    {item.stockStatus}
                  </span>
                </div>
              </div>

              {/* Title & Category with Bold Typography */}
              <h4 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight font-display text-zinc-100 group-hover:text-orange-400 transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {item.shortDesc}
              </p>

              {/* Specifications Block */}
              <div className="mt-4 p-3.5 rounded-sm bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs font-mono text-zinc-300">
                {item.specifications.capacity && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">Capacity / Travel:</span>
                    <span className="font-bold text-zinc-200 text-right">{item.specifications.capacity}</span>
                  </div>
                )}
                {item.specifications.power && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">Power / Motor:</span>
                    <span className="font-bold text-zinc-200 text-right">{item.specifications.power}</span>
                  </div>
                )}
                {item.specifications.precision && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">Precision:</span>
                    <span className="font-bold text-emerald-400 text-right">{item.specifications.precision}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-400 uppercase">Warranty:</span>
                  <span className="font-bold text-orange-400 text-right">{item.specifications.warranty}</span>
                </div>
              </div>

              {/* Bullet highlights */}
              <ul className="mt-3.5 space-y-1 text-xs text-zinc-400">
                {item.highlights.slice(0, 3).map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom action row */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">INDICATIVE QUOTE</span>
                <span className="text-xs sm:text-sm font-bold text-zinc-200 font-mono">{item.priceRange}</span>
              </div>

              <button
                id={`btn-ask-item-${item.id}`}
                onClick={() => onAskAdesh(`I'm interested in the ${item.name} (${item.modelCode}). Can you provide specifications, quotation and tell me about the trial demo options?`)}
                className="px-4 py-2.5 rounded-sm bg-zinc-800 hover:bg-orange-500 hover:text-black text-zinc-200 font-mono font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-zinc-700"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>ASK ADESH</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
