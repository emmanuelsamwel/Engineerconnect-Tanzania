import React, { useState } from 'react';
import { Category, Language } from '../types';
import { Brain, ShieldAlert, Sparkles, Check, HelpCircle, AlertTriangle } from 'lucide-react';

interface AIDiagnosisResult {
  diagnosis: string;
  recommendedCategory: Category;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  estimatedCostRange: string;
  safetySteps: string[];
  technicalReasoning: string;
  swahiliTranslation?: {
    diagnosis: string;
    urgency: string;
    safetySteps: string[];
  };
}

interface AIAssistantDashboardProps {
  language: Language;
  onInitiateHire: (category: Category, description: string, urgency: 'Low' | 'Medium' | 'High' | 'Emergency', costRange: string) => void;
}

export default function AIAssistantDashboard({ language, onInitiateHire }: AIAssistantDashboardProps) {
  const [description, setDescription] = useState('');
  const [categoryContext, setCategoryContext] = useState<Category>('Electrical');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIDiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          categoryContext,
          language: language === 'sw' ? 'Swahili' : 'English'
        })
      });

      if (!res.ok) {
        throw new Error('Failed to communicate with diagnostic backend.');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(language === 'sw' ? 'Imefeli kupata jibu kutoka AI. Tafadhali jaribu tena.' : 'Failed to retrieve AI diagnosis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    const u = urgency.toLowerCase();
    if (u === 'emergency' || u === 'dharura' || u === 'high' || u === 'kuu') return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    if (u === 'medium' || u === 'kati') return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
  };

  return (
    <div id="ai-assistant-wrapper" className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-800/60 border border-emerald-500/20 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-3 opacity-15">
          <Brain className="w-24 h-24 text-emerald-400" />
        </div>

        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3 h-3 mr-1" /> Gemini 3.5 Engine Powering
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            {language === 'en' ? 'AI Diagnostic Assistant' : 'Msaidizi wa Matengenezo wa AI'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {language === 'en' 
              ? 'Our server-side AI inspects descriptions of engineering issues (such as water pressure drops, generator smoke, medical monitor alarm codes) to deduce errors, recommend specialists, and compute secure safety guidelines.'
              : 'AI yetu iliyoko kwenye server hukagua maelezo ya matatizo ya kiufundi (kama vile kupungua kwa shinikizo la maji, moshi wa jenereta, hitilafu za mashine za hospitali) ili kutoa msaada wa usalama na kupendekeza fundi sahihi.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form panel */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-800/40 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
            {language === 'en' ? 'Describe the Breakdown' : 'Fafanua Hitilafu Husika'}
          </h3>

          <form onSubmit={handleDiagnose} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">
                {language === 'en' ? 'Likely Asset Category' : 'Kundi cha Kifaa / Hitilafu'}
              </label>
              <select
                value={categoryContext}
                onChange={(e) => setCategoryContext(e.target.value as Category)}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
              >
                <option value="Electrical">Electrical (Umeme)</option>
                <option value="Mechanical">Mechanical (Makanika)</option>
                <option value="Civil">Civil (Ujenzi / Mabomba)</option>
                <option value="Biomedical">Biomedical (Vifaa vya Hospitali)</option>
                <option value="Solar">Solar (Nishati ya Jua)</option>
                <option value="Automation">Automation (Sensa / Programu)</option>
                <option value="HVAC">HVAC (Kiyoyozi / AC)</option>
                <option value="Maintenance">General Maintenance (Matengenezo Mengine)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">
                {language === 'en' ? 'Problem Symptoms & Observations' : 'Dalili & Maelezo ya Hitilafu'}
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={language === 'en' 
                  ? "e.g. My off-grid solar system battery doesn't hold charge, and the inverter flashes a Red light with alarm code E03."
                  : "e.g. AC ya chumbani haitoi baridi kabisa, inatoa sauti nene mkwaruzo chini na maji yanavuja nje ya tundu."}
                className="w-full h-32 px-3.5 py-2.5 bg-slate-900 border border-white/10 focus:border-emerald-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-slate-950 text-xs font-bold transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Brain className="w-4 h-4" />
              <span>
                {loading 
                  ? (language === 'en' ? 'Processing Diagnostic Vectors...' : 'AI Inachambua Hitilafu sasa...') 
                  : (language === 'en' ? 'Run Intelligent Technical Scan' : 'Changanua Hitilafu kwa Teknolojia ya AI')}
              </span>
            </button>
          </form>

          {/* Quick templates */}
          <div className="space-y-2 pt-2">
            <h4 className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
              {language === 'en' ? 'Common Diagnostic Scenarios' : 'Mifano ya Hitilafu za Kawaida'}
            </h4>
            <div className="space-y-1.5">
              {[
                { label: 'Solar Battery & Charge Inverter Fault', desc: 'Solar battery controller E02 warning showing over-current voltage leakage from inverter array under full sun.' },
                { label: 'Hospital Sterilizer Pressure Autoclave', desc: 'Biomedical autoclave pressure drops continuously below 1.2 bar and fails sterilization runs.' },
                { label: 'Water pump engine friction overload', desc: 'Submersible pipeline pump vibrates heavily, emitting friction ozone smell and automatic shut-down breaker triggers.' }
              ].map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDescription(sc.desc);
                    if (sc.label.toLowerCase().includes('solar')) setCategoryContext('Solar');
                    else if (sc.label.toLowerCase().includes('autoclave')) setCategoryContext('Biomedical');
                    else setCategoryContext('Mechanical');
                  }}
                  className="w-full text-left p-2 rounded bg-slate-900/50 hover:bg-slate-900 border border-white/5 text-[10px] text-slate-350 transition block overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  💡 {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {loading && (
            <div className="p-8 rounded-xl bg-slate-800/10 border border-emerald-500/10 text-center space-y-4 animate-pulse">
              <div className="mx-auto w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
              <div className="space-y-2">
                <p className="text-xs font-mono text-emerald-400">CONNECTING WITH GEMINI CORES...</p>
                <p className="text-[10px] text-slate-500">De-serializing engineering standard parameters. Synthesizing safe action vectors.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="p-8 rounded-xl bg-slate-800/20 border border-white/5 text-center space-y-3">
              <div className="inline-flex p-3.5 bg-slate-800/85 text-slate-500 rounded-full">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-300">
                  {language === 'en' ? 'Awaiting System Diagnostic Parameter' : 'Machanganuzi ya AI Yapo Tayari'}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {language === 'en' 
                    ? 'Enter technical symptoms on the left to review real structural risk warnings and custom local quotes in TZS.'
                    : 'Ingiza dalili kushoto ili kupata ripoti hai ya usalama na makadirio ya gharama za matengenezo nchini.'}
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="p-5 rounded-xl bg-slate-800/80 border border-emerald-500/20 space-y-5 animate-fade-in text-xs leading-relaxed">
              {/* Header result */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Diagnosis Report / Ripoti ya AI</span>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Specialist Match: <span className="text-emerald-400">{result.recommendedCategory}</span></span>
                  </h4>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${getUrgencyColor(result.urgency)}`}>
                    🛡️ {language === 'sw' && result.swahiliTranslation ? result.swahiliTranslation.urgency : result.urgency} Urgency
                  </span>
                </div>
              </div>

              {/* Diagnosis body */}
              <div className="space-y-2">
                <h5 className="font-mono text-[10px] uppercase text-emerald-400 tracking-wider">
                  ⚠️ {language === 'en' ? 'Detected Technical Breakdown' : 'Hitilafu Iliyobainishwa'}
                </h5>
                <p className="text-slate-200 text-xs">
                  {language === 'sw' && result.swahiliTranslation ? result.swahiliTranslation.diagnosis : result.diagnosis}
                </p>
              </div>

              {/* Cost indicator and Reasoning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-900/60 rounded-lg">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono">ESTIMATED EXPENDITURE RANGE:</span>
                  <div className="text-sm font-black text-yellow-300 tracking-tight">
                    {result.estimatedCostRange}
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Based on local TZS raw labor values</p>
                </div>

                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/5 sm:pl-3">
                  <span className="text-[10px] text-slate-400 font-mono">ENGINEERING SYSTEM INSIGHT:</span>
                  <p className="text-[10px] text-slate-300 line-clamp-2">
                    {result.technicalReasoning}
                  </p>
                </div>
              </div>

              {/* Safety Steps */}
              <div className="space-y-2.5 p-3.5 rounded-lg bg-rose-950/20 border border-slate-700">
                <h5 className="font-mono text-[10px] uppercase text-rose-400 tracking-wider flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>{language === 'en' ? 'CRITICAL IMPOSED SAFETY INSTRUCTIONS' : 'HATUA KUU ZA USALAMA'}</span>
                </h5>
                <ul className="text-[11px] text-slate-350 space-y-1.5">
                  {(language === 'sw' && result.swahiliTranslation ? result.swahiliTranslation.safetySteps : result.safetySteps).map((stepVal, stepIdx) => (
                    <li key={stepIdx} className="flex items-start space-x-1.5">
                      <span className="text-rose-400 text-[10px] font-mono mt-0.5">[{stepIdx + 1}]</span>
                      <span>{stepVal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    onInitiateHire(
                      result.recommendedCategory,
                      language === 'sw' && result.swahiliTranslation ? result.swahiliTranslation.diagnosis : result.diagnosis,
                      result.urgency,
                      result.estimatedCostRange
                    );
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {language === 'en' 
                      ? `Auto-Hire Suggested ${result.recommendedCategory} Specialist` 
                      : `Unda ombi la Mtaalamu wa ${result.recommendedCategory}`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
