import React, { useState } from 'react';
import { Category, Language } from '../types';
import { AlertCircle, MapPin, Navigation, Send, Radio, CheckCircle2 } from 'lucide-react';

interface EmergencyDashboardProps {
  language: Language;
  onDispatchSOS: (issueTitle: string, description: string, category: Category, gps: string) => void;
}

export default function EmergencyDashboard({ language, onDispatchSOS }: EmergencyDashboardProps) {
  const [selectedIssue, setSelectedIssue] = useState('Power System Failure (ICU/Ward B)');
  const [locInput, setLocInput] = useState('Lugalo Military Hospital, Dar es Salaam');
  const [activeSOS, setActiveSOS] = useState(false);
  const [responders, setResponders] = useState<{ name: string; eta: string; distance: string }[]>([]);

  const emergencyScenarios = [
    { title: 'Hospital Power Outage / Grid Failure', category: 'Electrical' as Category, desc: 'Critical life-support backup failure in operation theatre or intensive care.' },
    { title: 'High-Pressure Water Main Burst', category: 'Civil' as Category, desc: 'Burst pipeline flooding structural foundations or clinic equipment clusters.' },
    { title: 'Clinical Oxygen Line Leakage', category: 'Biomedical' as Category, desc: 'Central gas line drop below safe atmospheric criteria.' },
    { title: 'Transformer Explosion / AC Leakage', category: 'HVAC' as Category, desc: 'Industrial HVAC or compressor smoke threatening staff safety.' },
  ];

  const triggerSOS = () => {
    setActiveSOS(true);
    // Auto populate dispatch responders within seconds
    setResponders([
      { name: 'Eng. Juma Jumanne', eta: '12 mins', distance: '1.8 km' },
      { name: 'Eng. Benson Peter', eta: '19 mins', distance: '3.2 km' }
    ]);
    const issueObj = emergencyScenarios.find(s => s.title.includes(selectedIssue)) || emergencyScenarios[0];
    onDispatchSOS(
      selectedIssue,
      `${issueObj.title}: Rapid response priority. ${issueObj.desc}`,
      issueObj.category,
      locInput
    );
  };

  return (
    <div id="emergency-sos-panel" className="space-y-6">
      <div className="p-5 rounded-2xl bg-rose-950/25 border border-rose-500/20 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-rose-500 text-slate-950 rounded-full animate-ping absolute"></div>
          <div className="p-2.5 bg-rose-500 text-slate-950 rounded-full relative z-10">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-rose-400">
              {language === 'en' ? '⚠️ RAPID EMERGENCY SERVICE SOS DISPATCH' : '⚠️ HUDUMA YA HARAKA YA SOS / DHARURA'}
            </h2>
            <p className="text-slate-300 mt-1">
              {language === 'en' 
                ? 'For high-risk breakdown hazards threatening medical safety, public health, or structural safety. Broadcasts instant emergency GPS feeds to nearby engineers.'
                : 'Kwa hitilafu kubwa zinazohatarisha usalama wa maisha au muundo. Inasambaza GPS na maelezo ya dharura mara moja kwa wahandisi.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left SOS Trigger */}
        <div className="p-5 rounded-xl bg-slate-800/40 border border-white/5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase font-mono">
            {language === 'en' ? 'SOS Parameters' : 'Vigezo vya Dharura'}
          </h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">CRITICAL INCIDENT DESCRIPTION</label>
              <select
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-medium text-white focus:outline-none"
              >
                {emergencyScenarios.map((sc, i) => (
                  <option key={i} value={sc.title}>{sc.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">SITE LOCATION DETECTED/GPS</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={locInput}
                  onChange={(e) => setLocInput(e.target.value)}
                  placeholder="Enter specific address or hospital ward..."
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                />
                <button
                  onClick={() => { setLocInput('-6.8234° S, 39.2694° E (Dar Port Compound)'); }}
                  className="p-2.5 bg-slate-700 hover:bg-slate-650 rounded-lg text-slate-200 transition"
                  title="Capture GPS Coordinates"
                >
                  <MapPin className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>

            {/* Glowing Big SOS Button */}
            <div className="pt-4 flex flex-col items-center">
              <button
                id="sos-button-click"
                onClick={triggerSOS}
                disabled={activeSOS}
                className={`w-36 h-36 rounded-full flex flex-col items-center justify-center font-black uppercase text-sm tracking-widest relative transition-transform duration-150 ${
                  activeSOS 
                    ? 'bg-slate-700 text-slate-400 border-4 border-slate-600 scale-95CursorNotAllowed' 
                    : 'bg-rose-600 hover:bg-rose-500 text-white border-8 border-rose-950/30 shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95'
                }`}
              >
                {activeSOS ? (
                  <>
                    <Radio className="w-8 h-8 animate-beat stroke-[3px] text-rose-400 mb-1" />
                    <span className="text-[10px]">Broadcasting</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">SOS</span>
                    <span className="text-[9px] font-mono tracking-normal mt-1">Press 3s</span>
                  </>
                )}
              </button>
              <span className="text-[9px] text-slate-500 font-mono mt-3">
                {language === 'en' ? 'Click to trigger immediate satellite broadcast alert' : 'Bofya kutuma dharura ya haraka satelaiti'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Live Responders status */}
        <div className="p-5 rounded-xl bg-slate-800/40 border border-white/5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase font-mono">
            {language === 'en' ? 'SOS SAT-TRACK LEDGER' : 'MGAWANYO WA MAFUNDI DHARURA'}
          </h3>

          {!activeSOS ? (
            <div className="p-10 border border-dashed border-white/5 rounded-lg text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-2">
              <Navigation className="w-8 h-8 text-slate-600 rotate-45" />
              <p>GPS tracking dormant. Initiate SOS dialer to notify nearby specialists.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="p-3 rounded bg-rose-500/15 border border-rose-500/20 text-rose-400 font-medium flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                <span>Incident logged. Emergency dispatch dispatchers active.</span>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-[10px] text-slate-400 font-mono uppercase">RESPONDING CERTIFIED ENGINEERS:</h4>
                <div className="space-y-2">
                  {responders.map((resp, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-center leading-7 text-xs font-black">
                          {resp.name[5]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">{resp.name}</p>
                          <p className="text-[10px] text-slate-500">Verified Professional Responder</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-emerald-400 font-extrabold">{resp.eta}</p>
                        <p className="text-[9px] text-slate-450 font-mono">({resp.distance})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-white/5 rounded-lg flex items-center space-x-2.5 text-slate-450 text-[10px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TANESCO and Emergency Control notified with structural metadata coordinates.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
