import React, { useState } from 'react';
import { Equipment, Engineer, Language } from '../types';
import { Settings, Calendar, Plus, UserPlus, CheckCircle, Clock } from 'lucide-react';

interface MaintenancePlannerProps {
  language: Language;
  engineers: Engineer[];
  equipment: Equipment[];
  onAddEquipment: (newEq: Omit<Equipment, 'id'>) => void;
  onLogService: (eqId: string, notes: string, engineerName: string) => void;
}

export default function MaintenancePlanner({
  language,
  engineers,
  equipment: initialEquipment,
  onAddEquipment,
  onLogService
}: MaintenancePlannerProps) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialEquipment);
  const [showAddForm, setShowAddForm] = useState(false);

  // New Equipment Form States
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [serial, setSerial] = useState('');
  const [location, setLocation] = useState('');
  const [nextDate, setNextDate] = useState('2026-07-01');
  const [assignedEng, setAssignedEng] = useState(engineers[0]?.id || '');

  // Log Service States
  const [activeEqId, setActiveEqId] = useState<string | null>(null);
  const [serviceNotes, setServiceNotes] = useState('');
  const [servicingEngName, setServicingEngName] = useState(engineers[0]?.name || 'Eng. Juma Jumanne');

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !serial) return;

    const newEq: Omit<Equipment, 'id'> = {
      name,
      model,
      serialNumber: serial,
      location,
      nextServiceDate: nextDate,
      assignedEngineerId: assignedEng,
      serviceHistory: []
    };

    onAddEquipment(newEq);
    setEquipmentList([...equipmentList, { ...newEq, id: `eq_${Date.now()}` }]);
    
    // reset
    setName('');
    setModel('');
    setSerial('');
    setLocation('');
    setShowAddForm(false);
  };

  const handleLogServiceSubmit = (eqId: string) => {
    if (!serviceNotes) return;
    onLogService(eqId, serviceNotes, servicingEngName);
    
    setEquipmentList(prev => prev.map(eq => {
      if (eq.id === eqId) {
        return {
          ...eq,
          nextServiceDate: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0], // add 90 days
          serviceHistory: [
            { id: `h_${Date.now()}`, date: new Date().toISOString().split('T')[0], notes: serviceNotes, engineerName: servicingEngName },
            ...eq.serviceHistory
          ]
        };
      }
      return eq;
    }));

    setServiceNotes('');
    setActiveEqId(null);
  };

  return (
    <div id="maintenance-planner-wrapper" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-white flex items-center gap-1.5">
            <Settings className="w-5 h-5 text-emerald-400" />
            <span>{language === 'en' ? 'Critical Asset & Equipment Registry' : 'Sajili ya Vifaa na Mitambo'}</span>
          </h2>
          <p className="text-[11px] text-slate-450">
            {language === 'en' 
              ? 'Schedule preventative maintenance programs and maintain secure chronological operation logs.'
              : 'Panga mipango ya matengenezo kinga na tunza nyaraka za uendeshaji wa vifaa.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Register Asset' : 'Sajili Kifaa'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmitNew} className="p-5 rounded-xl bg-slate-800/60 border border-emerald-500/20 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in text-xs">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono">ASSET NOMENCLATURE / JINA LA KIFAA</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Caterpillar Standby Generator 250kVA"
              className="w-full p-2 bg-slate-900 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono">SPECIFICATION MODEL/SERIAL NUMBER</label>
            <input
              type="text"
              required
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="e.g. CAT-9321-SNB"
              className="w-full p-2 bg-slate-900 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono">MAKER MODEL BRAND</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Caterpillar Diesel 2024"
              className="w-full p-2 bg-slate-900 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono">INSTALLATION LOCATION COGNITION</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Ocean Road Cancer Institute - Room 12"
              className="w-full p-2 bg-slate-900 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1 col-span-1 md:col-span-2">
            <label className="text-[10px] text-slate-400 font-mono">ASSIGN CERTIFIED ENGINEER</label>
            <select
              value={assignedEng}
              onChange={(e) => setAssignedEng(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-white/10 rounded font-medium text-white focus:outline-none"
            >
              {engineers.map(eg => (
                <option key={eg.id} value={eg.id}>{eg.name} ({eg.category})</option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 flex space-x-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="py-1.5 px-3.5 bg-slate-700 hover:bg-slate-650 text-white rounded font-medium text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-1.5 px-4 bg-emerald-500 hover:bg-emerald-450 text-slate-950 rounded font-bold text-[11px]"
            >
              Save Equipment Record
            </button>
          </div>
        </form>
      )}

      {/* Equipment List Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipmentList.map((eq) => {
          const matchedEng = engineers.find(e => e.id === eq.assignedEngineerId);
          return (
            <div key={eq.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-4 text-xs font-sans">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-100 text-sm">{eq.name}</h3>
                  <p className="text-[10px] text-slate-500 font-mono">Model: {eq.model} • SN: {eq.serialNumber}</p>
                </div>
                <span className="p-1 px-2.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-tight flex items-center space-x-1 uppercase">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Next: {eq.nextServiceDate}</span>
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-950/20 text-slate-350 space-y-2 border border-white/5">
                <span className="text-[10px] text-slate-500 font-mono uppercase">Installation Site:</span>
                <p className="text-slate-300 font-medium leading-relaxed">{eq.location}</p>
              </div>

              {matchedEng && (
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                  <UserPlus className="w-3.5 h-3.5 text-yellow-405" />
                  <span>Assigned Professional: <strong className="text-yellow-300">{matchedEng.name}</strong></span>
                </div>
              )}

              {/* Maintenance History */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                  <span>LOGGED REPAIR HISTORY:</span>
                  <button
                    onClick={() => setActiveEqId(activeEqId === eq.id ? null : eq.id)}
                    className="text-emerald-450 hover:underline text-[9px] font-medium uppercase font-sans border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5 hover:bg-emerald-500/10"
                  >
                    + Log New Service Event
                  </button>
                </h4>

                {activeEqId === eq.id && (
                  <div className="p-3 bg-slate-900 rounded-lg space-y-2 text-xs border border-emerald-500/15">
                    <textarea
                      required
                      value={serviceNotes}
                      onChange={(e) => setServiceNotes(e.target.value)}
                      placeholder="e.g. Conducted monthly diesel filter drainage, re-aligned generator starter motor terminals, verified ATS relay functionality..."
                      className="w-full h-20 p-2 text-xs bg-slate-950 border border-white/10 rounded focus:border-emerald-500 text-white focus:outline-none placeholder-slate-650 resize-none"
                    />
                    <div className="flex items-center justify-between gap-2.5">
                      <select
                        value={servicingEngName}
                        onChange={(e) => setServicingEngName(e.target.value)}
                        className="p-1 px-2 text-[10px] bg-slate-950 border border-white/10 rounded text-slate-300"
                      >
                        {engineers.map((eg) => (
                          <option key={eg.id} value={eg.name}>{eg.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleLogServiceSubmit(eq.id)}
                        className="py-1 px-3 bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-[10px] font-bold rounded"
                      >
                        Commit Log Entry
                      </button>
                    </div>
                  </div>
                )}

                {eq.serviceHistory.length === 0 ? (
                  <p className="text-[10px] text-slate-550 font-mono italic">No preventative services logged yet.</p>
                ) : (
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {eq.serviceHistory.map((h) => (
                      <div key={h.id} className="p-2 rounded bg-slate-900/50 border border-white/5 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between font-mono text-[9px] text-slate-500">
                          <span>📅 {h.date}</span>
                          <span className="text-yellow-400">By: {h.engineerName}</span>
                        </div>
                        <p className="text-slate-300 italic">"{h.notes}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
