import React, { useState } from "react";
import { SKILL_SPECIALTIES } from "../data";
import { CompetitionSector, SkillSpecialty } from "../types";
import { translations, Language } from "../translations";
import { ListFilter, Search, Bookmark, ChevronRight, HardHat, Terminal, HelpCircle, Hammer, Palette, HeartHandshake, Coffee } from "lucide-react";

interface SkillsTabProps {
  lang: Language;
}

export default function SkillsTab({ lang }: SkillsTabProps) {
  const [selectedSector, setSelectedSector] = useState<CompetitionSector | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState<SkillSpecialty>(SKILL_SPECIALTIES[0]);

  const t = translations[lang];

  // Sector Icon selector helper
  const getSectorIcon = (sector: CompetitionSector) => {
    switch (sector) {
      case CompetitionSector.ICT:
        return <Terminal className="text-sky-400" size={15} />;
      case CompetitionSector.MANUFACTURING:
        return <Hammer className="text-amber-400" size={15} />;
      case CompetitionSector.CONSTRUCTION:
        return <HardHat className="text-emerald-400" size={15} />;
      case CompetitionSector.CREATIVE:
        return <Palette className="text-pink-400" size={15} />;
      case CompetitionSector.SERVICES:
        return <HeartHandshake className="text-violet-400" size={15} />;
      case CompetitionSector.CULINARY:
        return <Coffee className="text-rose-400" size={15} />;
      default:
        return <HelpCircle size={15} />;
    }
  };

  // Filter skills
  const filteredSkills = SKILL_SPECIALTIES.filter((spec) => {
    const matchesSector = selectedSector === "All" || spec.sector === selectedSector;
    const matchesQuery = 
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.arabicName.includes(searchQuery);
    return matchesSector && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-5 text-neutral-100 p-1">
      
      {/* Tab Header Box */}
      <div className="border-b border-neutral-850 pb-3 flex flex-col gap-1">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Bookmark className="text-emerald-400" size={18} />
          {t.sylTitle}
        </h2>
        <p className="text-xs text-neutral-400">
          {t.sylSubtitle}
        </p>
      </div>

      {/* Sector quick selector tiles */}
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-1.5">
        <button
          id="btn-sector-catalog-all"
          onClick={() => setSelectedSector("All")}
          className={`p-2 rounded-xl text-[10px] font-medium font-sans border text-center cursor-pointer transition-colors ${
            selectedSector === "All"
              ? "bg-neutral-100 text-neutral-950 font-bold border-neutral-100"
              : "bg-neutral-900 text-neutral-400 border-neutral-850 hover:text-white"
          }`}
        >
          {lang === "ar" ? "جميع القطاعات" : lang === "fr" ? "Tous les secteurs" : "All Sectors"}
        </button>
        {Object.values(CompetitionSector).map((sec) => (
          <button
            key={sec}
            id={`btn-sector-catalog-${sec.slice(0, 5).toLowerCase()}`}
            onClick={() => setSelectedSector(sec)}
            className={`p-2 rounded-xl text-[10px] whitespace-nowrap overflow-hidden text-ellipsis font-medium font-sans border text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1 ${
              selectedSector === sec
                ? "bg-emerald-500/15 text-emerald-400 font-bold border-emerald-500/40"
                : "bg-neutral-900 text-neutral-400 border-neutral-850 hover:text-white"
            }`}
          >
            {getSectorIcon(sec)}
            <span className="truncate w-full text-center leading-tight mt-0.5">{sec.split(" & ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Left Hand: Skill specialty item list */}
        <div className="flex-1 flex flex-col gap-2 md:max-w-[45%]">
          
          {/* Inner mini search selector */}
          <div className="relative mb-1">
            <input
              id="input-skills-catalog-search"
              type="text"
              placeholder={lang === "ar" ? "ابحث عن المهارة..." : t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg pl-8 pr-3 py-1.5 text-neutral-200 outline-none focus:border-emerald-500"
            />
            <Search size={12} className="absolute left-2.5 top-2.5 text-neutral-500" />
          </div>

          <div className="flex flex-col gap-1.5 max-h-[350px] overflow-y-auto pr-1">
            {filteredSkills.map((spec) => {
              const isActive = activeSkill.name === spec.name;
              return (
                <button
                  key={spec.name}
                  id={`btn-skill-item-${spec.name.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setActiveSkill(spec)}
                  className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between gap-2.5 cursor-pointer transition-all ${
                    isActive
                      ? "bg-neutral-100 text-neutral-950 font-bold border-neutral-100 shadow-lg"
                      : "bg-neutral-900/60 text-neutral-300 border-neutral-850 hover:bg-neutral-900"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0">{getSectorIcon(spec.sector)}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs truncate">{lang === "ar" ? spec.arabicName : spec.name}</span>
                      <span className={`text-[10px] font-sans font-normal truncate mt-0.5 ${isActive ? "text-neutral-700" : "text-neutral-500"}`}>
                        {lang === "ar" ? spec.name : spec.arabicName}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={13} className={isActive ? "text-neutral-950" : "text-neutral-500"} />
                </button>
              );
            })}

            {filteredSkills.length === 0 && (
              <span className="text-xs text-neutral-500 italic p-3 text-center">
                {lang === "ar" ? "لا توجد نتائج مطابقة لبحثكم." : "No matching specialties found."}
              </span>
            )}
          </div>
        </div>

        {/* Right Hand: Detailed view of selection & simulation blueprint task */}
        <div className="flex-1 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-850 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex flex-col border-b border-neutral-850 pb-3 gap-1">
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
              {getSectorIcon(activeSkill.sector)}
              <span className="uppercase">{activeSkill.sector} SECTOR</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">
              {lang === "ar" ? activeSkill.arabicName : activeSkill.name}
            </h3>
            <span className="text-xs text-neutral-400 font-sans mt-0.5 font-medium">
              {lang === "ar" ? activeSkill.name : activeSkill.arabicName}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-rose-400">
              {lang === "ar" ? "الوصف وتفاصيل التخصص الفني" : "Technical Description & Overview"}
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-950">
              {activeSkill.details}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-amber-500">
              {lang === "ar" ? "معايير التقييم الدولية المعتمدة" : "International Assessment Standards"}
            </h4>
            <div className="bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-950 flex flex-col gap-2 text-[11px] text-zinc-300 leading-normal">
              <div className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold font-mono">&bull;</span>
                <span><strong>{lang === "ar" ? "المهارات المحورية:" : "Key Framework:"}</strong> {activeSkill.requirements}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold font-mono">&bull;</span>
                <span>
                  <strong>{lang === "ar" ? "نظام تنقيط اللجنة الفنية:" : "Technical Grading Rubric:"}</strong> 
                  {lang === "ar" 
                    ? " تقييم صارم من 100 نقطة خاضع للمقاييس المليمتيرية الدقيقة مع عدم التسامح في جودة الختام والتوصيل الجمالي والأمن المهني." 
                    : " Strict 100-point measurement standard requiring millimetric compliance, perfect finishing, robust functionality & absolute workspace safety compliance."}
                </span>
              </div>
            </div>
          </div>

          {/* AI-Grade Simulated Training Practice Task */}
          <div className="bg-emerald-950/15 border border-emerald-500/20 rounded-lg p-3 mt-1 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase font-mono">
              <span>{lang === "ar" ? "مخطط الاختبار الوطني النموذجي" : "National Finals Practical Test Blueprint"}</span>
            </div>
            
            <p className="text-xs text-neutral-300 mt-2 font-sans italic bg-neutral-950/10 p-2 rounded border border-neutral-900">
              {lang === "ar" 
                ? "يُعطى المتنافسون الجزائريون 18 ساعة موزعة على 3 إلى 4 أيام لإتمام وإنجاز تمرين معقد ومغلق يثبت كفاءتهم التامة، مع الكشف عن مخطط الاختبار التفصيلي والتغييرات بنسبة 30% قبل ساعتين فقط من انطلاق المنافسة لضمان الشفافية."
                : `“Algerian finalists are given 18 hours spread across 3 to 4 days to compile a fully functional and sealed physical or digital deliverable, with strict specifications and a mandatory 30% change released only 2 hours beforehand.”`}
            </p>

            <div className="mt-2.5 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
              <span>{lang === "ar" ? "الهدف: المعيار العالمي الذهبي" : "Target Standard: Elite Level"}</span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[9px]">
                WorldSkills WSC
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
