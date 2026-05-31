import React, { useState } from "react";
import { EVENT_SCHEDULES } from "../data";
import { CompetitionSector, EventSchedule } from "../types";
import { translations, Language } from "../translations";
import { Calendar, Search, MapPin, Tag, RefreshCw, Layers, CheckCircle, Flame, Plus, AlertCircle } from "lucide-react";

interface SchedulesTabProps {
  lang: Language;
}

export default function SchedulesTab({ lang }: SchedulesTabProps) {
  const [schedules, setSchedules] = useState<EventSchedule[]>(EVENT_SCHEDULES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");

  const t = translations[lang];
  const isRtl = lang === "ar";

  // Local state for simulator form to add an impromptu training workshop or mock exam
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newArabicSkill, setNewArabicSkill] = useState("");
  const [newSector, setNewSector] = useState<CompetitionSector>(CompetitionSector.ICT);
  const [newStage, setNewStage] = useState<"Local" | "Regional" | "National Finals">("Regional");
  const [newVenue, setNewVenue] = useState("");
  const [newDays, setNewDays] = useState("June 12 - June 15, 2026");

  // Filters
  const filteredSchedules = schedules.filter((sch) => {
    const matchesSearch = 
      sch.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.arabicSkill.includes(searchQuery) ||
      sch.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = selectedSector === "All" || sch.sector === selectedSector;
    const matchesStage = selectedStage === "All" || sch.stage === selectedStage;

    return matchesSearch && matchesSector && matchesStage;
  });

  // Toggle state simulation
  const cycleStatus = (id: string) => {
    setSchedules(prev => prev.map(sch => {
      const statusMap: { [key: string]: "Upcoming" | "In Progress" | "Completed" } = {
        "Upcoming": "In Progress",
        "In Progress": "Completed",
        "Completed": "Upcoming"
      };
      if (sch.id === id) {
        return { ...sch, status: statusMap[sch.status] };
      }
      return sch;
    }));
  };

  // Add new event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill || !newVenue) return;

    const newItem: EventSchedule = {
      id: `sch-${Date.now()}`,
      skill: newSkill,
      arabicSkill: newArabicSkill || "ورشة عمل اختيار خاصة",
      sector: newSector,
      stage: newStage,
      venue: newVenue,
      dateRange: newDays,
      status: "Upcoming",
      wilayasCompeting: ["Oran", "Algiers", "Tlemcen", "Representative Finalists"]
    };

    setSchedules([newItem, ...schedules]);
    setNewSkill("");
    setNewArabicSkill("");
    setNewVenue("");
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col gap-5 text-neutral-100 p-1">
      
      {/* Title & Stats */}
      <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="text-emerald-400" size={18} />
            {t.schTitle}
          </h2>
          <p className="text-xs text-neutral-400">{t.schSubtitle}</p>
        </div>
        <button
          id="btn-toggle-add-schedule"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 text-emerald-400 transition-colors"
        >
          <Plus size={13} />
          {t.schSimulateBtn}
        </button>
      </div>

      {/* Simulator Add Form Panel */}
      {showAddForm && (
        <form onSubmit={handleAddEvent} className="bg-neutral-900 rounded-xl border border-neutral-800 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
              {t.schAddTitle}
            </h3>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="text-neutral-500 hover:text-white text-xs cursor-pointer"
            >
              {t.cancelButton}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase">{t.schEngName}</label>
              <input
                id="input-add-eng-skill"
                type="text"
                required
                placeholder="e.g. Plastering Systems"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-neutral-200 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase">{t.schArabName}</label>
              <input
                id="input-add-arab-skill"
                type="text"
                placeholder="مثال: البناء الجاف والجبس"
                value={newArabicSkill}
                onChange={(e) => setNewArabicSkill(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-neutral-200 outline-none focus:border-emerald-500 text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase">{t.schSectorGroup}</label>
              <select
                id="select-add-sector"
                value={newSector}
                onChange={(e) => setNewSector(e.target.value as CompetitionSector)}
                className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-neutral-200 outline-none"
              >
                {Object.values(CompetitionSector).map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase">{t.schOlympiadStage}</label>
              <select
                id="select-add-stage"
                value={newStage}
                onChange={(e) => setNewStage(e.target.value as any)}
                className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-neutral-200 outline-none"
              >
                <option value="Local">Local (Wilayatal)</option>
                <option value="Regional">Regional Hub</option>
                <option value="National Finals">National Finals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase">{t.schVenueLabel}</label>
              <input
                id="input-add-venue"
                type="text"
                required
                placeholder="e.g. INSFP Tlemcen"
                value={newVenue}
                onChange={(e) => setNewVenue(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-neutral-200 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase">{t.schDateLabel}</label>
              <input
                id="input-add-dates"
                type="text"
                value={newDays}
                onChange={(e) => setNewDays(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-neutral-200 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            id="btn-submit-simulation-event"
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors mt-1"
          >
            {t.schInsertBtn}
          </button>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-2.5">
        
        {/* Search input bar */}
        <div className="relative">
          <input
            id="input-schedule-search"
            type="text"
            placeholder={lang === "ar" ? "ابحث عن التخصصات، مقرات التدريب، المراكز الإقليمية..." : t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-xl pl-9 pr-4 py-2.5 text-neutral-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <Search size={14} className="absolute left-3 top-3 text-neutral-500" />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">{t.schSectorHeaders}</div>
          <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-thin">
            <button
              id="pill-sector-all"
              onClick={() => setSelectedSector("All")}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap cursor-pointer border transition-colors ${
                selectedSector === "All"
                  ? "bg-neutral-100 text-neutral-900 border-neutral-100 font-bold"
                  : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"
              }`}
            >
              {lang === "ar" ? "جميع القطاعات" : lang === "fr" ? "Tous les secteurs" : "All Sectors"}
            </button>
            {Object.values(CompetitionSector).map((sec) => (
              <button
                key={sec}
                id={`pill-sector-${sec.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap cursor-pointer border transition-colors ${
                  selectedSector === sec
                    ? "bg-neutral-100 text-neutral-900 border-neutral-100 font-bold"
                    : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Stage selection */}
        <div className="flex flex-wrap gap-1.5 items-center bg-neutral-900/40 p-1.5 rounded-xl border border-neutral-900">
          <span className="text-[10px] font-mono uppercase text-neutral-500 px-1">{lang === "ar" ? "المراحل المهنية:" : "Stages:"}</span>
          {["All", "Local", "Regional", "National Finals"].map((stg) => (
            <button
              key={stg}
              id={`btn-filter-stage-${stg.replace(/\s+/g, '-')}`}
              onClick={() => setSelectedStage(stg)}
              className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedStage === stg
                  ? "bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {stg === "All" ? (lang === "ar" ? "الكل" : "All") : stg === "Local" ? (lang === "ar" ? "ولائي محلي" : "Local") : stg === "Regional" ? (lang === "ar" ? "إقليمي" : "Regional") : (lang === "ar" ? "نهائيات وطنية" : "National Finals")}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Cards List */}
      <div className="flex flex-col gap-3">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((sch) => {
            const isCompleted = sch.status === "Completed";
            const isInProgress = sch.status === "In Progress";
            const isUpcoming = sch.status === "Upcoming";

            return (
              <div 
                key={sch.id} 
                className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-850 hover:border-neutral-800 rounded-xl p-4 flex flex-col gap-3 relative transition-all group"
              >
                {/* Live simulated tag & cycle simulator button */}
                <button
                  id={`btn-cycle-status-${sch.id}`}
                  onClick={() => cycleStatus(sch.id)}
                  title="Click to simulate cycle schedule status"
                  className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors p-1 hover:bg-neutral-850 rounded cursor-pointer"
                >
                  <RefreshCw size={12} className="group-hover:rotate-45 transition-transform" />
                </button>

                <div className="flex flex-col gap-1 pr-6">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] bg-neutral-850 text-neutral-400 font-mono px-2 py-0.5 rounded border border-neutral-850">
                      {sch.stage} {lang === "ar" ? "مرحلة" : "Phase"}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500">{sch.sector}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1 leading-tight flex flex-col">
                    <span>{lang === "ar" ? sch.arabicSkill : sch.skill}</span>
                    <span className="text-[11px] text-neutral-500 font-normal mt-0.5 text-right">{lang === "ar" ? sch.skill : sch.arabicSkill}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-neutral-900 text-xs">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <MapPin size={13} className="text-emerald-500 shrink-0" />
                    <span className="truncate" title={sch.venue}>{sch.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Calendar size={13} className="text-rose-500 shrink-0" />
                    <span>{sch.dateRange}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-neutral-900/60 bg-neutral-950/20 px-1 py-0.5 rounded-lg">
                  {/* Status Indicator Bar */}
                  <div className="flex items-center gap-1.5">
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium tracking-tight">
                        <CheckCircle size={11} className="text-emerald-500" />
                        {t.schCompleted}
                      </span>
                    )}
                    {isInProgress && (
                      <span className="flex items-center gap-1 text-[10px] text-rose-400 font-medium tracking-tight animate-pulse bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/10">
                        <Flame size={11} className="text-rose-500 animate-bounce" />
                        {t.schOngoing}
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="flex items-center gap-1 text-[10px] text-sky-400 font-medium tracking-tight">
                        <Layers size={11} className="text-sky-500" />
                        {t.schUpcoming}
                      </span>
                    )}
                  </div>

                  {/* Competing Wilayas Count */}
                  <div className="text-[9px] text-neutral-500 font-mono font-normal">
                    {t.schRepresentedWilayas}: {sch.wilayasCompeting.length === 1 ? sch.wilayasCompeting[0] : `${sch.wilayasCompeting.length} active`}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-neutral-900 rounded-xl border border-neutral-850 text-center gap-2 animate-fade-in">
            <AlertCircle size={22} className="text-neutral-600 animate-wiggle" />
            <span className="text-xs text-neutral-400">{lang === "ar" ? "لا توجد فعاليات مطابقة للبحث." : "No events matching the criteria found."}</span>
            <button
              id="btn-clear-schedule-filters"
              onClick={() => {
                setSearchQuery("");
                setSelectedSector("All");
                setSelectedStage("All");
              }}
              className="text-xs text-emerald-400 hover:underline cursor-pointer"
            >
              {lang === "ar" ? "إعادة تعيين مرشحات البحث" : "Reset Schedule Filters"}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
