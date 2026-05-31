import React, { useState, useEffect } from "react";
import { Laptop, Smartphone, Wifi, Battery, ShieldCheck } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
  activeTabTitle: string;
  lang?: "en" | "ar" | "fr";
}

export default function DeviceFrame({ children, activeTabTitle, lang = "ar" }: DeviceFrameProps) {
  const [isMobileMode, setIsMobileMode] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  const brandInfo = {
    ar: {
      ministry: "الجمهورية الجزائرية الديمقراطية الشعبية",
      dept: "وزارة التكوين والتعليم المهنيين",
      sub: "90th عضو المنظمة الدولية • بوابة التميز للأولمبياد الوطني"
    },
    fr: {
      ministry: "Rép. Algérienne Démocratique et Populaire",
      dept: "Ministère de la Formation & Enseignement Professionnels",
      sub: "90ème Membre de WorldSkills • Portail Olympiade Nationale des Métiers"
    },
    en: {
      ministry: "Democratic Republic of Algeria",
      dept: "Ministry of Vocational Training and Education",
      sub: "90th Member of WorldSkills International • National Skills Registry Portal"
    }
  };

  const selectedBrand = brandInfo[lang] || brandInfo.ar;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-3 sm:p-6 text-neutral-100">
      
      {/* Brand Top Header Container */}
      <div className="w-full max-w-5xl mb-6 flex flex-col md:flex-row md:items-center md:justify-between px-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <span className="text-emerald-400 font-bold leading-none select-all font-sans">WorldSkills Algeria 2026</span>
              <span className="text-neutral-500 text-sm hidden md:inline">|</span>
              <span className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed">{selectedBrand.dept}</span>
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {selectedBrand.ministry} • {selectedBrand.sub}
          </p>
        </div>

        {/* Device Mode Toggle Option */}
        <div className="mt-4 md:mt-0 flex bg-neutral-900 border border-neutral-800 p-1 rounded-xl items-center gap-1 self-start">
          <button
            id="btn-emulator-apkmobile"
            onClick={() => setIsMobileMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-sans cursor-pointer transition-colors ${
              isMobileMode
                ? "bg-emerald-500 text-neutral-950 font-bold shadow-lg"
                : "text-neutral-400 hover:text-white hover:bg-neutral-850"
            }`}
          >
            <Smartphone size={14} />
            Android APK Emulator
          </button>
          <button
            id="btn-emulator-fullweb"
            onClick={() => setIsMobileMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-sans cursor-pointer transition-colors ${
              !isMobileMode
                ? "bg-emerald-500 text-neutral-950 font-bold shadow-lg"
                : "text-neutral-400 hover:text-white hover:bg-neutral-850"
            }`}
          >
            <Laptop size={14} />
            Responsive Web App
          </button>
        </div>
      </div>

      {/* Main Container Core */}
      <div className="w-full flex items-center justify-center">
        {isMobileMode ? (
          /* Phone Frame Simulator */
          <div className="relative w-[385px] h-[780px] bg-neutral-900 rounded-[50px] p-3 border-4 border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden max-w-full">
            
            {/* Top Ear Speaker & Camera Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-50 flex items-center justify-center gap-3 border-b border-x border-neutral-850">
              <div className="w-8 h-1 bg-neutral-700 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-blue-950/80 border border-neutral-700" />
            </div>

            {/* Inner Display Screen Area */}
            <div className="w-full h-full bg-neutral-950 rounded-[40px] overflow-hidden flex flex-col relative border border-neutral-850">
              
              {/* Virtual Top Native Notification Bar */}
              <div className="h-10 bg-neutral-950 flex justify-between items-center px-6 text-neutral-400 text-xs select-none select-none z-40 border-b border-neutral-900/50">
                <span className="font-semibold font-mono">{currentTime}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck size={10} />
                    APK.LIVE
                  </span>
                  <Wifi size={12} className="text-neutral-400" />
                  <Battery size={14} className="text-emerald-400 fill-emerald-800" />
                </div>
              </div>

              {/* Main Emulated Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col bg-neutral-950 scrollbar-none pb-4">
                {children}
              </div>

              {/* Virtual Android Pill Bottom bar */}
              <div className="h-6 bg-neutral-950 flex items-center justify-center z-40">
                <div className="w-28 h-1 bg-neutral-700 rounded-full cursor-pointer hover:bg-neutral-500 transition-colors" />
              </div>

            </div>
          </div>
        ) : (
          /* Responsive Web App Screen Frame */
          <div className="w-full max-w-5xl h-[780px] bg-neutral-950 rounded-3xl border border-neutral-800 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Desktop-like App Bar */}
            <div className="px-6 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-neutral-400 ml-3 font-mono">
                  https://worldskills.mvet.dz/apps/algeria2026
                </span>
              </div>
              <div className="text-xs bg-neutral-800 text-emerald-400 px-3 py-1 rounded-full font-sans font-medium">
                Active Tab: {activeTabTitle}
              </div>
            </div>

            {/* Inner responsive box */}
            <div className="flex-1 overflow-y-auto flex flex-col bg-neutral-950 p-2 md:p-6">
              <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                {children}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
