import React, { useState, useMemo } from "react";
import { getAll58Wilayas } from "../data";
import { WilayaMedal } from "../types";
import { translations, Language } from "../translations";
import { Trophy, Search, Star, Medal, RotateCcw, Award, Plus, Sparkles } from "lucide-react";

interface MedalsTabProps {
  lang: Language;
  wilayaList: WilayaMedal[];
  setWilayaList: React.Dispatch<React.SetStateAction<WilayaMedal[]>>;
}

export default function MedalsTab({ lang, wilayaList, setWilayaList }: MedalsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"gold" | "total" | "code">("gold");

  const t = translations[lang];

  // Filter and sort the 58 Wilayas
  const processedWilayas = useMemo(() => {
    let list = [...wilayaList];
    
    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.arabicName.includes(q) ||
        String(w.code).padStart(2, '0') === q ||
        String(w.code) === q
      );
    }

    // Sort order
    return list.sort((a, b) => {
      if (sortBy === "gold") {
        if (b.gold !== a.gold) return b.gold - a.gold;
        return b.total - a.total;
      } else if (sortBy === "total") {
        if (b.total !== a.total) return b.total - a.total;
        return b.gold - a.gold;
      } else {
        return a.code - b.code;
      }
    });

  }, [wilayaList, searchQuery, sortBy]);

  // Handle mock simulation inside MedalsTab to increment a medal and sync it up
  const incrementMedal = (code: number, type: "gold" | "silver" | "bronze") => {
    setWilayaList(prev => prev.map(w => {
      if (w.code === code) {
        const update = { ...w };
        update[type] += 1;
        update.total = update.gold + update.silver + update.bronze;
        return update;
      }
      return w;
    }));
  };

  // Reset medals to original configuration
  const resetMedals = () => {
    setWilayaList(getAll58Wilayas());
  };

  // Calculate sum counts
  const totals = useMemo(() => {
    return wilayaList.reduce((acc, current) => {
      acc.gold += current.gold;
      acc.silver += current.silver;
      acc.bronze += current.bronze;
      acc.total += current.total;
      return acc;
    }, { gold: 0, silver: 0, bronze: 0, total: 0 });
  }, [wilayaList]);

  // Gather Top 5 Wilayas for visual chart representation
  const topFive = useMemo(() => {
    return [...wilayaList]
      .sort((a, b) => {
        if (b.gold !== a.gold) return b.gold - a.gold;
        return b.total - a.total;
      })
      .slice(0, 5);
  }, [wilayaList]);

  const maxTopGoldValue = Math.max(...topFive.map(w => w.gold), 1);

  return (
    <div className="flex flex-col gap-5 text-neutral-100 p-1">
      
      {/* Title & Stats Ribbon */}
      <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="text-rose-500" size={18} />
            {t.medTitle}
          </h2>
          <p className="text-xs text-neutral-400">{t.medSubtitle}</p>
        </div>
        <button
          id="btn-reset-simulator-medals"
          onClick={resetMedals}
          className="text-[11px] text-neutral-450 hover:text-white flex items-center gap-1 cursor-pointer hover:bg-neutral-900 border border-neutral-850 px-2 py-1 rounded-lg transition-colors"
        >
          <RotateCcw size={11} />
          {t.resetButton}
        </button>
      </div>

      {/* Aggregate Medal Counter Card Row */}
      <div className="bg-neutral-900/40 rounded-xl border border-neutral-900 p-3.5 grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 font-mono uppercase truncate">{t.totalLabel}</span>
          <span className="text-lg font-bold text-white mt-0.5 font-mono">{totals.total}</span>
        </div>
        <div className="flex flex-col border-l border-neutral-900">
          <span className="text-[10px] text-amber-500 font-mono uppercase flex items-center gap-1 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {t.goldLabel}
          </span>
          <span className="text-lg font-bold text-amber-500 mt-0.5 font-mono">{totals.gold}</span>
        </div>
        <div className="flex flex-col border-l border-neutral-900">
          <span className="text-[10px] text-zinc-400 font-mono uppercase flex items-center gap-1 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" /> {t.silverLabel}
          </span>
          <span className="text-lg font-bold text-zinc-400 mt-0.5 font-mono">{totals.silver}</span>
        </div>
        <div className="flex flex-col border-l border-neutral-900">
          <span className="text-[10px] text-amber-655 font-mono uppercase flex items-center gap-1 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-700" /> {t.bronzeLabel}
          </span>
          <span className="text-lg font-bold text-amber-600 mt-0.5 font-mono">{totals.bronze}</span>
        </div>
      </div>

      {/* Visual Top-5 Wilaya Leadership Representation chart */}
      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850">
        <div className="flex items-center gap-2 mb-3.5">
          <Star className="text-amber-400 fill-amber-500" size={14} />
          <span className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-300">
            {t.medPowerTitle}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {topFive.map((topW, index) => {
            const pct = (topW.gold / maxTopGoldValue) * 105;
            return (
              <div key={topW.code} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <span className="text-[10px] bg-neutral-850 px-1.5 py-0.5 rounded text-neutral-500 font-mono">
                      #{index + 1}
                    </span>
                    {lang === "ar" ? topW.arabicName : topW.name}
                    <span className="text-neutral-500 text-[10px] font-sans font-normal">
                      {lang === "ar" ? `(ولاية ${topW.code})` : `(${topW.arabicName})`}
                    </span>
                  </span>
                  <span className="text-amber-400 font-bold font-mono text-xs flex items-center gap-1">
                    {topW.gold} {t.goldLabel} / {topW.total} {lang === "ar" ? "مجموع" : "Total"}
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900/60 relative">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 transition-all duration-500"
                    style={{ width: `${Math.max(Math.min(pct, 100), 10)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sorting & Search Controls */}
      <div className="flex flex-col gap-2.5">
        {/* Search bar */}
        <div className="relative">
          <input
            id="input-medals-search"
            type="text"
            placeholder={lang === "ar" ? "ابحث عن الولاية (مثال: الجزائر، وهران، 16)..." : t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-xl pl-9 pr-4 py-2.5 text-neutral-200 focus:outline-none focus:border-rose-500"
          />
          <Search size={14} className="absolute left-3 top-3.5 text-neutral-500" />
        </div>

        {/* Sort triggers */}
        <div className="flex items-center justify-between text-xs bg-neutral-900/30 p-2 rounded-xl border border-neutral-850">
          <span className="text-[10px] font-mono uppercase text-neutral-500 leading-none">{t.medSortTitle}</span>
          <div className="flex items-center gap-1.5">
            <button
              id="btn-sort-medals-gold"
              onClick={() => setSortBy("gold")}
              className={`px-2.5 py-1 text-xs rounded cursor-pointer transition-colors ${
                sortBy === "gold" ? "bg-amber-450 text-neutral-950 bg-amber-400 font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {lang === "ar" ? "ذهبيات أولاً" : "Gold First"}
            </button>
            <button
              id="btn-sort-medals-total"
              onClick={() => setSortBy("total")}
              className={`px-2.5 py-1 text-xs rounded cursor-pointer transition-colors ${
                sortBy === "total" ? "bg-neutral-100 text-neutral-950 font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {lang === "ar" ? "المجموع الكلي" : "Most Total"}
            </button>
            <button
              id="btn-sort-medals-code"
              onClick={() => setSortBy("code")}
              className={`px-2.5 py-1 text-xs rounded cursor-pointer transition-colors ${
                sortBy === "code" ? "bg-neutral-100 text-neutral-950 font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {t.medCodeSort}
            </button>
          </div>
        </div>
      </div>

      {/* Standings Grid Table with simulator action inside */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
          {t.medGridHeader} ({processedWilayas.length} results):
        </div>

        <div className="flex flex-col gap-2.5">
          {processedWilayas.map((wilaya) => {
            const formattedCode = String(wilaya.code).padStart(2, "0");
            return (
              <div 
                key={wilaya.code} 
                className="bg-neutral-900/60 border border-neutral-850 hover:bg-neutral-900 rounded-xl p-3 flex flex-col gap-3 transition-colors"
              >
                {/* Main Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-6 w-6 shrink-0 rounded-lg bg-neutral-800 border border-neutral-700 text-[10px] font-mono font-semibold flex items-center justify-center text-neutral-400">
                      {formattedCode}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white block truncate">
                        {lang === "ar" ? wilaya.arabicName : wilaya.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-sans block truncate">
                        {lang === "ar" ? wilaya.name : wilaya.arabicName}
                      </span>
                    </div>
                  </div>

                  {/* Medal breakdown and increment buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Gold Count with simulated increment option */}
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-amber-500">
                      <span className="text-xs font-bold font-mono">{wilaya.gold}</span>
                      <button
                        id={`btn-inc-gold-${wilaya.code}`}
                        onClick={() => incrementMedal(wilaya.code, "gold")}
                        className="p-0.5 hover:bg-amber-500/25 rounded transition-transform scale-90 cursor-pointer text-amber-400"
                        title="Simulate Gold Win"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Silver Count */}
                    <div className="flex items-center gap-1 bg-zinc-500/10 border border-zinc-500/20 px-2 py-0.5 rounded-lg text-zinc-300">
                      <span className="text-xs font-bold font-mono">{wilaya.silver}</span>
                      <button
                        id={`btn-inc-silver-${wilaya.code}`}
                        onClick={() => incrementMedal(wilaya.code, "silver")}
                        className="p-0.5 hover:bg-zinc-500/25 rounded transition-transform scale-90 cursor-pointer text-zinc-200"
                        title="Simulate Silver Win"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Bronze Count */}
                    <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-lg text-amber-655 text-amber-600">
                      <span className="text-xs font-bold font-mono">{wilaya.bronze}</span>
                      <button
                        id={`btn-inc-bronze-${wilaya.code}`}
                        onClick={() => incrementMedal(wilaya.code, "bronze")}
                        className="p-0.5 hover:bg-orange-500/25 rounded transition-transform scale-90 cursor-pointer text-amber-500"
                        title="Simulate Bronze Win"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub row showing core focal skill representing this Wilaya */}
                <div className="flex items-center justify-between text-[10px] mt-0.5 border-t border-neutral-950 pt-1.5 font-mono text-neutral-400">
                  <div className="flex items-center gap-1 min-w-0">
                    <Award size={10} className="text-emerald-500 shrink-0" />
                    <span className="truncate">
                      {t.focusLabel} <span className="text-emerald-400 font-semibold">{wilaya.featuredSkill || "Technical Core"}</span>
                    </span>
                  </div>
                  <div className="text-white text-xs font-bold shrink-0">
                    {t.scoreLabel} {wilaya.total} {lang === "ar" ? "ميدالية" : "medals"}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
