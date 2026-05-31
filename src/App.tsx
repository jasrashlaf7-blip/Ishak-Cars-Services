import React, { useState, useEffect } from "react";
import DeviceFrame from "./components/DeviceFrame";
import DashboardTab from "./components/DashboardTab";
import SchedulesTab from "./components/SchedulesTab";
import MedalsTab from "./components/MedalsTab";
import SkillsTab from "./components/SkillsTab";
import RegistrationTab from "./components/RegistrationTab";
import GuidanceTab from "./components/GuidanceTab";

import { translations, Language } from "./translations";
import { getAll58Wilayas } from "./data";
import { WilayaMedal } from "./types";

import { 
  Home, 
  Calendar, 
  Trophy, 
  Bookmark, 
  UserCheck, 
  MessageSquare,
  Sparkles,
  Award,
  Globe
} from "lucide-react";

type TabName = "home" | "schedules" | "medals" | "skills" | "registration" | "guidance";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("worldskills_lang");
    return (saved as Language) || "ar"; // Defaults to Arabic for authenticity
  });

  // Global shared State for the 58 Wilayas scoreboards
  const [wilayaList, setWilayaList] = useState<WilayaMedal[]>(() => getAll58Wilayas());

  // Interactive Live Simulated Ticker stream state
  const [tickerEvents, setTickerEvents] = useState<string[]>(() => [
    "Jury validation complete for Mobile Applications Development: Algiers leading.",
    "Constantine Tech Hub recorded perfect level measurements in Mechatronics & Electronics.",
    "Oran candidate completed the Drywall drywall structural panel with sub-millimeter precision.",
    "Mounir Yahiaoui from Sidi Bel Abbès advanced to National Finals."
  ]);

  // Handle saving to local storage
  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("worldskills_lang", newLang);
  };

  // Real-time updates simulation engine (every 10 seconds a winner scores)
  useEffect(() => {
    const eventTypes: Record<Language, string[]> = {
      en: [
        "scored 98.4% in Web Technologies!",
        "completed the pneumatic logic control loop with zero defects!",
        "crafted an amazing chocolate sculpture in Confectionery!",
        "insulated a drywall partition with 0.4mm level precision!",
        "debugged a complex mobile state synchronizer in 12 minutes!",
        "achieved absolute perfect marks in Hotel Reception checklist!",
        "configured high-availability Cloud Computing VPC in record time!"
      ],
      ar: [
        "أحرز نتيجة مبهرة 98.4% في مهارة تقنيات الويب!",
        "أكمل بنجاح توصيل صمامات التحكم الهوائي بنسبة خطأ صفرية!",
        "أنجز قطعة فنية مذهلة من الشوكولاتة في مسابقة الحلويات!",
        "ثبّت جداراً مزدوجاً بدقة متناهية تحت 0.4 ملم!",
        "أصلح مشكلة تطابق ومزامنة معقدة في تطبيق هاتف خلال 12 دقيقة!",
        "حقق العلامة الكاملة في محاكاة الاستقبال والخدمات الفندقية!",
        "أنشأ خادماً سحابياً عالي الفعالية في وقت قياسي!"
      ],
      fr: [
        "a obtenu un score de 98.4% en technologies Web !",
        "a configuré le panneau pneumatique avec zéro défaut !",
        "a sculpté une splendide structure en chocolat d'art !",
        "a isolé une cloison sèche avec une tolérance de 0.4mm !",
        "a résolu un bug de synchronisation mobile en 12 minutes !",
        "a obtenu la note maximale en simulation d'accueil hôtelier !",
        "a déployé une infrastructure Cloud AWS VPC en temps record !"
      ]
    };

    const names = [
      "Yacine", "Khadidja", "Sid Ahmed", "Amine", "Farid", "Rania", "Abdelkader", 
      "Meriem", "Anis", "Sonia", "Fouad", "Chaima", "Youssef", "Imane", "Kamal"
    ];

    const interval = setInterval(() => {
      // 1. Pick random Wilaya from the list
      const index = Math.floor(Math.random() * wilayaList.length);
      const randomW = wilayaList[index];

      // 2. Pick random student, event strings in active language
      const name = names[Math.floor(Math.random() * names.length)];
      const phraseEn = `${name} (${randomW.name}) ${eventTypes.en[Math.floor(Math.random() * eventTypes.en.length)]}`;
      const phraseAr = `مباشر: تميز ${name} (ولاية ${randomW.arabicName}) - ${eventTypes.ar[Math.floor(Math.random() * eventTypes.ar.length)]}`;
      const phraseFr = `${name} (${randomW.name}) ${eventTypes.fr[Math.floor(Math.random() * eventTypes.fr.length)]}`;

      // 3. Select based on current language
      const finalMsg = lang === "ar" ? phraseAr : lang === "fr" ? phraseFr : phraseEn;

      // 4. Update feed activity stream
      setTickerEvents(prev => [finalMsg, ...prev.slice(0, 5)]);

      // 5. Award random medal to this Wilaya to show live places and score ranking updates
      const rng = Math.random();
      const type = rng > 0.7 ? "gold" : rng > 0.4 ? "silver" : "bronze";

      setWilayaList(prev => prev.map(w => {
        if (w.code === randomW.code) {
          const u = { ...w };
          u[type] += 1;
          u.total = u.gold + u.silver + u.bronze;
          return u;
        }
        return w;
      }));
    }, 11000); // Live event occurs every 11 seconds

    return () => clearInterval(interval);
  }, [lang, wilayaList.length]);

  // Manual Trigger to simulate sudden elite achievement & level update
  const handleSimulateWinner = () => {
    // Pick random wilaya
    const index = Math.floor(Math.random() * wilayaList.length);
    const targetW = wilayaList[index];
    const itemType = Math.random() > 0.5 ? "gold" : Math.random() > 0.5 ? "silver" : "bronze";

    setWilayaList(prev => prev.map(w => {
      if (w.code === targetW.code) {
        const u = { ...w };
        u[itemType] += 1;
        u.total = u.gold + u.silver + u.bronze;
        return u;
      }
      return w;
    }));

    const alertMsg = {
      en: `Live Alert: State of ${targetW.name} gained a new ${itemType} medal! Scoreboard updated.`,
      ar: `تنبيه مباشر: فازت ولاية ${targetW.arabicName} بميدالية ${itemType === "gold" ? "ذهبية" : itemType === "silver" ? "فضية" : "برونزية"} جديدة! تـم تعديل لوحة النتائج تلقائياً.`,
      fr: `Alerte direct: La Wilaya de ${targetW.name} remporte une nouvelle médaille de ${itemType} !`
    };

    setTickerEvents(prev => [alertMsg[lang], ...prev.slice(0, 5)]);
  };

  const t = translations[lang];
  const isRtl = lang === "ar";

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <DashboardTab 
            lang={lang} 
            wilayaList={wilayaList} 
            tickers={tickerEvents} 
            onSimulate={handleSimulateWinner}
            onNavigateToTab={(tab) => setActiveTab(tab as TabName)} 
          />
        );
      case "schedules":
        return <SchedulesTab lang={lang} />;
      case "medals":
        return (
          <MedalsTab 
            lang={lang} 
            wilayaList={wilayaList} 
            setWilayaList={setWilayaList} 
          />
        );
      case "skills":
        return <SkillsTab lang={lang} />;
      case "registration":
        return <RegistrationTab lang={lang} />;
      case "guidance":
        return <GuidanceTab lang={lang} />;
      default:
        return (
          <DashboardTab 
            lang={lang}
            wilayaList={wilayaList} 
            tickers={tickerEvents} 
            onSimulate={handleSimulateWinner}
            onNavigateToTab={(tab) => setActiveTab(tab as TabName)} 
          />
        );
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "home":
        return t.hubTitle;
      case "schedules":
        return t.schTitle;
      case "medals":
        return t.medTitle;
      case "skills":
        return t.sylTitle;
      case "registration":
        return t.regTitle;
      case "guidance":
        return t.aiAdvisorTitle;
      default:
        return "WorldSkills Tracking";
    }
  };

  const TAB_BUTTONS = [
    { id: "home", label: t.tabHub, arabic: "المركز", icon: <Home size={15} /> },
    { id: "schedules", label: t.tabSchedules, arabic: "التوقيت", icon: <Calendar size={15} /> },
    { id: "medals", label: t.tabStandings, arabic: "الترتيب", icon: <Trophy size={15} /> },
    { id: "skills", label: t.tabSyllabus, arabic: "التخصصات", icon: <Bookmark size={15} /> },
    { id: "registration", label: t.tabBadge, arabic: "البطاقة", icon: <UserCheck size={15} /> },
    { id: "guidance", label: t.tabAiGuide, arabic: "المرشد", icon: <MessageSquare size={15} /> }
  ];

  return (
    <DeviceFrame activeTabTitle={getTabTitle()} lang={lang}>
      
      {/* Dynamic Tab Navigation Bar - Desktop / Web view top deck */}
      <div 
        dir={isRtl ? "rtl" : "ltr"}
        className="hidden md:flex items-center justify-between border-b border-neutral-850 bg-neutral-900/60 p-2.5 rounded-2xl mb-5 backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5">
          {TAB_BUTTONS.map((btn) => {
            const isActive = activeTab === btn.id;
            return (
              <button
                key={btn.id}
                id={`tab-desktop-${btn.id}`}
                onClick={() => setActiveTab(btn.id as TabName)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  isActive
                    ? "bg-emerald-500 text-neutral-950 font-bold shadow-lg shadow-emerald-500/10 scale-102"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-850"
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Multi-Language Select Bar Triggers directly on layout deck */}
        <div className="flex items-center gap-1 bg-neutral-950/80 border border-neutral-800 p-1 rounded-xl">
          <button
            id="btn-lang-ar"
            onClick={() => changeLanguage("ar")}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-colors ${
              lang === "ar" ? "bg-emerald-500 text-neutral-950" : "text-neutral-400 hover:text-white"
            }`}
          >
            العربية
          </button>
          <button
            id="btn-lang-fr"
            onClick={() => changeLanguage("fr")}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-colors ${
              lang === "fr" ? "bg-emerald-500 text-neutral-950" : "text-neutral-400 hover:text-white"
            }`}
          >
            FR
          </button>
          <button
            id="btn-lang-en"
            onClick={() => changeLanguage("en")}
            className={`px-2 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-colors ${
              lang === "en" ? "bg-emerald-500 text-neutral-950" : "text-neutral-400 hover:text-white"
            }`}
          >
            ENG
          </button>
        </div>
      </div>

      {/* Visual Ticker Alert ribbon directly visible globally on top in ltr/rtl */}
      <div 
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-2.5 mb-4 flex items-center justify-between gap-2 text-xs overflow-hidden"
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
          <span className="shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            {lang === "ar" ? "مستجدات فورية" : lang === "fr" ? "EN DIRECT" : "LIVE FEED"}
          </span>
          <div className="flex-1 overflow-hidden relative h-5 select-none min-w-0">
            <div className="absolute inset-0 flex items-center text-neutral-300 font-sans truncate text-[11px]">
              {tickerEvents[0]}
            </div>
          </div>
        </div>

        {/* Micro mobile language quick selectors */}
        <div className="flex shrink-0 items-center gap-1 bg-neutral-950/80 border border-neutral-850 p-1 rounded-lg text-[9px] font-mono leading-none md:hidden">
          <button onClick={() => changeLanguage("ar")} className={`px-1.5 py-0.5 cursor-pointer rounded ${lang === "ar" ? "bg-emerald-500 text-neutral-950 font-bold" : "text-neutral-500"}`}>عربي</button>
          <button onClick={() => changeLanguage("fr")} className={`px-1.5 py-0.5 cursor-pointer rounded ${lang === "fr" ? "bg-emerald-500 text-neutral-950 font-bold" : "text-neutral-500"}`}>FR</button>
          <button onClick={() => changeLanguage("en")} className={`px-1.5 py-0.5 cursor-pointer rounded ${lang === "en" ? "bg-emerald-500 text-neutral-950 font-bold" : "text-neutral-500"}`}>EN</button>
        </div>
      </div>

      {/* Main Container Content */}
      <div 
        dir={isRtl ? "rtl" : "ltr"} 
        className="flex-1 min-h-[500px] flex flex-col pb-20 md:pb-4"
      >
        {renderActiveTabContent()}
      </div>

      {/* Bottom Floating Navigation dock - Mobile View bar */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 bg-neutral-900/95 border border-neutral-800 backdrop-blur-lg rounded-2xl py-2 px-1 flex justify-around items-center z-50 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        {TAB_BUTTONS.map((btn) => {
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              id={`tab-mobile-${btn.id}`}
              onClick={() => setActiveTab(btn.id as TabName)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer transition-all ${
                isActive
                  ? "text-emerald-400 font-bold scale-115"
                  : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              <div className={`${isActive ? "bg-emerald-500/15 p-1.5 rounded-lg border border-emerald-500/20" : ""}`}>
                {btn.icon}
              </div>
              <span className="text-[9px] uppercase tracking-wider font-mono font-bold mt-1 text-center leading-none">
                {btn.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

    </DeviceFrame>
  );
}

