import React, { useState } from 'react';
import { Engineer, Complaint, Transaction, Language } from '../types';
import { ShieldCheck, UserX, CreditCard, Trash2, HelpCircle, CheckCircle, Scale, DollarSign, Activity } from 'lucide-react';

interface AdminPanelProps {
  language: Language;
  engineers: Engineer[];
  onToggleVerifyEngineer: (id: string) => void;
  complaints: Complaint[];
  onResolveComplaint: (id: string, notes: string) => void;
  transactions: Transaction[];
}

export default function AdminPanel({
  language,
  engineers,
  onToggleVerifyEngineer,
  complaints: initialComplaints,
  onResolveComplaint,
  transactions
}: AdminPanelProps) {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [activeTab, setActiveTab] = useState<'verify' | 'complaints' | 'finance'>('verify');
  const [arbitrationNotes, setArbitrationNotes] = useState<Record<string, string>>({});

  // Compute stats
  const totalFinancialVolume = transactions.reduce((sum, tx) => sum + (tx.status === 'Completed' ? tx.amount : 0), 0);
  const pendingVerifications = engineers.filter(e => !e.isVerified).length;
  const activeIssuesCount = complaints.filter(c => c.status === 'Pending').length;

  const handleResolve = (id: string) => {
    const notes = arbitrationNotes[id] || 'Dispute amicably resolved under Section 14 platform code of conduct arbitration.';
    onResolveComplaint(id, notes);
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved', resolutionNotes: notes } : c));
  };

  return (
    <div id="admin-analytics-wrapper" className="space-y-6">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">SECURE PLATFORM VOLUME</span>
            <h4 className="text-lg font-black text-emerald-400 mt-1">
              {totalFinancialVolume.toLocaleString()} TZS
            </h4>
            <p className="text-[9px] text-slate-500 font-mono">Mobile Money & Bank settlement</p>
          </div>
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">PENDING VERIFICATIONS</span>
            <h4 className="text-lg font-black text-yellow-400 mt-1">{pendingVerifications} Engineers</h4>
            <p className="text-[9px] text-slate-500 font-mono">Awaiting ERB status audit</p>
          </div>
          <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">ACTIVE GRIEVANCE DISPUTES</span>
            <h4 className="text-lg font-black text-rose-400 mt-1">{activeIssuesCount} Cases</h4>
            <p className="text-[9px] text-slate-500 font-mono">Arbitration log desk active</p>
          </div>
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
            <Scale className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/5 space-x-2">
        <button
          onClick={() => setActiveTab('verify')}
          className={`px-4 py-2 text-xs font-bold font-mono transition-all border-b-2 ${
            activeTab === 'verify' 
              ? 'border-emerald-500 text-white bg-white/5' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🧑‍✈️ Verify Credentials
        </button>
        <button
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-2 text-xs font-bold font-mono transition-all border-b-2 ${
            activeTab === 'complaints' 
              ? 'border-emerald-500 text-white bg-white/5' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚖️ Dispute & Arbitration ({activeIssuesCount})
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 text-xs font-bold font-mono transition-all border-b-2 ${
            activeTab === 'finance' 
              ? 'border-emerald-500 text-white bg-white/5' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          📊 Cash Audit Ledger
        </button>
      </div>

      {/* Content Panels */}
      <div className="p-5 rounded-xl bg-slate-800/30 border border-white/5 text-xs">
        {activeTab === 'verify' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-250 flex items-center gap-1.5 font-mono uppercase">
              <span>ERB REGISTRY CREDENTIALS DEPT.</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Audit license submissions, university certifications, and confirm if applicants qualify to accept civic contracts under Tanzanian law.
            </p>

            <div className="grid grid-cols-1 gap-3.5">
              {engineers.map((e) => (
                <div key={e.id} className="p-4 rounded-lg bg-slate-900/50 border border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={e.avatar}
                      alt={e.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-extrabold text-slate-200">{e.name}</span>
                        {e.isVerified ? (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-405 font-bold text-[9px] font-mono">VERIFIED</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-405 font-bold text-[9px] font-mono">PENDING ERB</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-450">{e.category} Specialist • {e.location}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {e.certifications.map((c, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[8px] font-mono text-slate-400 border border-white/5">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleVerifyEngineer(e.id)}
                    className={`py-2 px-3.5 rounded-lg font-bold text-[10px] tracking-wide transition-all ${
                      e.isVerified 
                        ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/15 border border-rose-500/20' 
                        : 'bg-emerald-500 hover:bg-emerald-450 text-slate-950 shadow-md'
                    }`}
                  >
                    {e.isVerified ? 'Revoke ERB License Status' : 'Verify & Approve ERB Credentials'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-250 flex items-center gap-1.5 font-mono uppercase">
              <span>Arbitration Cases Log</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Review grievances filed by customers or technicians concerning billing disputes, delayed execution of tasks, or non-compliance of structural work.
            </p>

            {complaints.length === 0 ? (
              <div className="p-8 border border-dashed border-white/5 rounded-lg text-center text-slate-500 font-mono">
                No disputes filed in arbitration ledger system.
              </div>
            ) : (
              <div className="space-y-3.5 font-sans">
                {complaints.map((c) => (
                  <div key={c.id} className="p-4 rounded-lg bg-slate-900/50 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-mono text-slate-450">Case ID: {c.id}</span>
                        <h4 className="font-extrabold text-slate-200">{c.title}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider ${
                        c.status === 'Pending' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-950/20 p-2.5 rounded border border-white/5">
                      {c.description}
                    </p>

                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Filer: {c.userEmail}</span>
                      <span>Accused: {c.accusedEmail}</span>
                    </div>

                    {c.status === 'Pending' ? (
                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <input
                          type="text"
                          value={arbitrationNotes[c.id] || ''}
                          onChange={(e) => setArbitrationNotes({ ...arbitrationNotes, [c.id]: e.target.value })}
                          placeholder="Type authoritative platform settlement ruling..."
                          className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded text-xs text-white placeholder-slate-600 focus:outline-none"
                        />
                        <button
                          onClick={() => handleResolve(c.id)}
                          className="px-3.5 py-1.5 rounded bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-[10px] font-bold tracking-wide transition shadow"
                        >
                          Issue Final Settlement Resolution
                        </button>
                      </div>
                    ) : (
                      <div className="p-2 bg-emerald-500/5 rounded text-[11px] border border-emerald-500/10 text-emerald-300">
                        <strong>Resolution Notes:</strong> {c.resolutionNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-4 font-mono">
            <h3 className="text-sm font-bold text-slate-250 flex items-center gap-1.5 uppercase">
              <span>REAL-TIME TRANSACTION LEDGER ENGINE</span>
            </h3>
            <p className="text-[11px] text-slate-450">
              Audit transaction settlements securely processed via local mobile money aggregators (M-Pesa, Tigo Pesa, Airtel Money) and CRDB/NMB banks.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-slate-950/40 rounded-lg overflow-hidden text-left border border-white/5 text-[10px]">
                <thead>
                  <tr className="bg-slate-950 text-slate-450">
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Contractor</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Settlement</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/5">
                      <td className="p-3">{tx.transactionRef}</td>
                      <td className="p-3 font-sans font-medium">{tx.customerName}</td>
                      <td className="p-3 font-sans font-medium">{tx.engineerName}</td>
                      <td className="p-3 uppercase text-yellow-300">{tx.paymentMethod}</td>
                      <td className="p-3 font-bold text-emerald-400">{tx.amount.toLocaleString()} TZS</td>
                      <td className="p-3">
                        <span className="p-1 rounded text-[8px] bg-emerald-500/10 text-emerald-400 font-bold">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
