import React, { useState, useEffect } from 'react';
import { Language, UserRole } from '../types';
import { TRANSLATIONS } from '../data';
import { ShieldCheck, Smartphone, CheckCircle, Globe, Sparkles } from 'lucide-react';

interface SplashViewProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onComplete: (user: { name: string; phone: string; role: UserRole; location: string }) => void;
}

export default function SplashView({ language, setLanguage, onComplete }: SplashViewProps) {
  const [step, setStep] = useState<'splash' | 'lang' | 'role' | 'details' | 'otp'>('splash');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dar es Salaam');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleStart = () => {
    setStep('lang');
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setStep('role');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'guest') {
      onComplete({
        name: language === 'sw' ? 'Mteja Mgeni' : 'Guest Specialist',
        phone: '+255 000 000 000',
        role: 'guest',
        location: 'Dar es Salaam'
      });
    } else {
      setStep('details');
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsOtpSent(true);
    setTimer(59);
    setStep('otp');
  };

  const handleOtpVerify = () => {
    if (otp.length === 6 || otp === '123456') {
      onComplete({
        name,
        phone,
        role: selectedRole,
        location: city
      });
    } else {
      alert(language === 'sw' ? 'Namba ya siri sio sahihi. Jaribu 123456' : 'Invalid OTP. Please enter 123456 as simulation PIN.');
    }
  };

  return (
    <div id="splash-view-container" className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6 overflow-hidden relative">
      {/* Tanzanian Flag Accents in Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

      {/* Top logo */}
      <div className="flex items-center justify-between w-full max-w-md mx-auto z-10 pt-4">
        <div className="flex items-center space-x-2">
          <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl shadow-lg ring-1 ring-white/10">
            <span className="font-mono text-xl font-black tracking-tighter text-slate-950">EC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-yellow-200 to-blue-300 bg-clip-text text-transparent">
              EngineerConnect
            </h1>
            <p className="text-[9px] font-mono tracking-widest text-emerald-400">TANZANIA</p>
          </div>
        </div>

        {/* Global Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition text-xs font-medium"
        >
          <Globe className="w-3.5 h-3.5 text-yellow-300" />
          <span>{language === 'en' ? 'Swahili' : 'English'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="my-auto w-full max-w-md mx-auto z-10 py-8">
        {step === 'splash' && (
          <div className="space-y-6 text-center animate-fade-in" id="splash-start">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"></div>
              <span className="text-6xl select-none relative">🇹🇿</span>
            </div>
            
            <div className="space-y-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3 h-3 mr-1" /> Verified Technical Care
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'en' ? 'Get Connected to Certified Local Experts' : 'Unganishwa na Wahandisi na Mafundi Shupavu'}
              </h2>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                {t.splashText}
              </p>
            </div>

            <button
              id="start-onboarding-btn"
              onClick={handleStart}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:opacity-95 text-slate-950 text-sm font-bold shadow-xl transition-all hover:scale-[1.01] active:scale-95 duration-100"
            >
              {t.getStarted}
            </button>
          </div>
        )}

        {step === 'lang' && (
          <div className="space-y-6 text-center animate-fade-in" id="lang-selection">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{language === 'en' ? 'Select Preferred Language' : 'Chagua Lugha Unayopendelea'}</h3>
              <p className="text-xs text-slate-400">Unaweza kubadilisha lugha hii baadaye wakati wowote</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                id="select-en-btn"
                onClick={() => handleLanguageSelect('en')}
                className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-750 border-2 border-emerald-500/30 text-center transition group flex flex-col items-center space-y-3"
              >
                <span className="text-4xl group-hover:scale-110 transition duration-200">🇬🇧</span>
                <span className="font-bold text-sm text-emerald-300">English</span>
                <span className="text-[10px] text-slate-400">Default business terminology</span>
              </button>

              <button
                id="select-sw-btn"
                onClick={() => handleLanguageSelect('sw')}
                className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-750 border-2 border-yellow-500/30 text-center transition group flex flex-col items-center space-y-3"
              >
                <span className="text-4xl group-hover:scale-110 transition duration-200">🇹🇿</span>
                <span className="font-bold text-sm text-yellow-300">Kiswahili</span>
                <span className="text-[10px] text-slate-400">Lugha ya Taifa ya Tanzania</span>
              </button>
            </div>
          </div>
        )}

        {step === 'role' && (
          <div className="space-y-5 animate-fade-in" id="role-selection">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight">{t.roleSelectTitle}</h3>
              <p className="text-xs text-slate-400">{t.roleSelectDesc}</p>
            </div>

            <div className="space-y-3.5">
              <button
                onClick={() => handleRoleSelect('customer')}
                className="w-full p-4 rounded-xl text-left bg-slate-800/80 hover:bg-slate-750 border border-white/10 hover:border-emerald-500/40 transition group flex items-start space-x-3.5"
              >
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:bg-emerald-500/20">
                  🧬
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300">{t.customer}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.customerDesc}</p>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('engineer')}
                className="w-full p-4 rounded-xl text-left bg-slate-800/80 hover:bg-slate-750 border border-white/10 hover:border-yellow-500/40 transition group flex items-start space-x-3.5"
              >
                <div className="p-2.5 bg-yellow-500/10 text-yellow-400 rounded-lg group-hover:bg-yellow-500/20">
                  🚀
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-yellow-300">{t.engineer}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.engineerDesc}</p>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('admin')}
                className="w-full p-4 rounded-xl text-left bg-slate-800/80 hover:bg-slate-750 border border-white/10 hover:border-blue-500/40 transition group flex items-start space-x-3.5"
              >
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500/20">
                  💼
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-blue-300">{t.admin}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.adminDesc}</p>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('guest')}
                className="w-full py-3 rounded-xl text-center bg-slate-800 hover:bg-slate-750 border border-white/5 text-xs text-slate-300 font-medium tracking-wide"
              >
                {t.guest}
              </button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-5 animate-fade-in" id="details-form">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">{selectedRole === 'engineer' ? 'Engineer Account Setup' : 'Create User Account'}</h3>
              <p className="text-xs text-slate-400">Enter your official identification details and localized station context.</p>
            </div>

            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Full Name / Jina Lakili</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Yohana Massero"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-sm focus:border-emerald-500 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">{t.phoneInput}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +255 712 000 000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-sm focus:border-emerald-500 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Primary Resident Hub / Mkoa uliopo</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-sm focus:border-emerald-500 text-white focus:outline-none appearance-none"
                >
                  <option value="Dar es Salaam">Dar es Salaam</option>
                  <option value="Arusha">Arusha</option>
                  <option value="Dodoma">Dodoma</option>
                  <option value="Mwanza">Mwanza</option>
                  <option value="Zanzibar">Zanzibar</option>
                  <option value="Mbeya">Mbeya</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold text-sm transition shadow-lg"
              >
                Send OTP Dispatch Code
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-5 text-center animate-fade-in" id="otp-verification">
            <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-2">
              <Smartphone className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">{t.otpTitle}</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t.otpDesc} <strong className="text-emerald-400">({phone})</strong>
              </p>
              <div className="px-3.5 py-1.5 inline-block text-[11px] font-mono tracking-wider bg-slate-800 rounded border border-white/10 text-yellow-300">
                Simulation PIN is <span className="font-bold">123456</span> or any 6 digits
              </div>
            </div>

            <div className="space-y-4 max-w-xs mx-auto">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full py-3.5 text-center text-2xl font-bold tracking-[0.5em] bg-slate-800 border-2 border-white/10 focus:border-emerald-500 rounded-xl focus:outline-none text-white placeholder-slate-650"
              />

              <button
                onClick={handleOtpVerify}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold text-xs transition uppercase tracking-wider"
              >
                {t.verifyOtp}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Didn't receive?</span>
                {timer > 0 ? (
                  <span>Resend in <strong className="text-emerald-400">{timer}s</strong></span>
                ) : (
                  <button
                    onClick={() => { setTimer(59); }}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Resend SMS Code
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Credentials */}
      <div className="text-center text-[10px] text-slate-500 font-mono z-10 py-2">
        <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-emerald-500" />
        Verified Professional Network. Tanzania © 2026.
      </div>
    </div>
  );
}
