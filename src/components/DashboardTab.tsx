import { useState, useEffect } from "react";
import { STAGES_EXPLANATION, SKILL_SPECIALTIES } from "../data";
import { translations, Language } from "../translations";
import { WilayaMedal } from "../types";
import { 
  Trophy, 
  MapPin, 
  Radio, 
  Sparkles, 
  Hourglass, 
  Briefcase, 
  School, 
  UsersRound,
  Loader2,
  Tv,
  Users,
  Award,
  ChevronRight,
  Zap
} from "lucide-react";

interface DashboardTabProps {
  lang: Language;
  wilayaList: WilayaMedal[];
  tickers: string[];
  onSimulate: () => void;
  onNavigateToTab: (tabName: string) => void;
}

export default function DashboardTab({ 
  lang, 
  wilayaList, 
  tickers, 
  onSimulate, 
  onNavigateToTab 
}: DashboardTabProps) {
  const [selectedSkillForAI, setSelectedSkillForAI] = useState("Mobile Applications Development");
  const [selectedWilayaForAI, setSelectedWilayaForAI] = useState("Oran");
  const [aiCommentary, setAiCommentary] = useState("");
  const [loadingCommentary, setLoadingCommentary] = useState(false);
  const [countdownText, setCountdownText] = useState("");
  const [selectedHub, setSelectedHub] = useState<string>("Algiers");

  const t = translations[lang];
  const isRtl = lang === "ar";

  // Regional Hubs map config
  const REGIONAL_HUBS = [
    { id: "Algiers", name: "Algiers Hub (North)", nameAr: "مركز الجزائر", color: "border-sky-500 text-sky-400 bg-sky-500/10", wilayas: ["Algiers", "Blida", "Boumerdès", "Tipaza", "Tizi Ouzou", "Jijel", "Bejaia"] },
    { id: "Constantine", name: "Constantine Hub (East)", nameAr: "مركز قسنطينة", color: "border-purple-500 text-purple-400 bg-purple-500/10", wilayas: ["Constantine", "Sétif", "Batna", "Skikda", "Annaba", "Guelma", "Mila"] },
    { id: "Oran", name: "Tlemcen & Oran Hub (West)", nameAr: "مركز وهران وتلمسان", color: "border-amber-500 text-amber-400 bg-amber-500/10", wilayas: ["Oran", "Tlemcen", "Sidi Bel Abbès", "Mascara", "Mostaganem", "Chlef", "Relizane"] },
    { id: "Ghardaia", name: "Ghardaïa Hub (South-East)", nameAr: "مركز غرداية", color: "border-emerald-500 text-emerald-400 bg-emerald-500/10", wilayas: ["Ghardaïa", "Ouargla", "El Oued", "Touggourt", "Illizi", "Tamanrasset"] },
    { id: "Bechar", name: "Béchar Hub (South-West)", nameAr: "مركز بشار", color: "border-rose-500 text-rose-400 bg-rose-500/10", wilayas: ["Béchar", "Tindouf", "Adrar", "Béni Abbès", "Naâma", "Timimoun"] }
  ];

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date("2026-07-12T09:00:00Z").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdownText(lang === "ar" ? "بدأت النهائيات الوطنية!" : lang === "fr" ? "Finales lancées !" : "National Finals Active!");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      if (lang === "ar") {
        setCountdownText(`متبقي ${days} يوم و ${hours} ساعة`);
      } else if (lang === "fr") {
        setCountdownText(`Restant: ${days}j ${hours}h ${minutes}m`);
      } else {
        setCountdownText(`${days}d ${hours}h ${minutes}m left`);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, [lang]);

  // Fast connection check: local generation runs instantly if the network fails or slows down
  const generateAICommentary = async () => {
    setLoadingCommentary(true);
    setAiCommentary("");
    
    // Quick local simulation text to make it incredibly fast and VPN-independent
    const skillObj = SKILL_SPECIALTIES.find(s => s.name === selectedSkillForAI);
    const skillLabel = lang === "ar" ? skillObj?.arabicName : skillObj?.name;
    
    const localFailsafe: Record<Language, string> = {
      en: `[OFFICIAL FEED] Outstanding practical showcase in Oran & Constantine! The verified candidate representing ${selectedWilayaForAI} is showing sub-millimeter level standard compliance in ${skillLabel}. Assessment rubric scored high marks for ergonomic wiring layout & structural neatness.`,
      ar: `[البث الوطني المباشر] عرض تطبيقي متميز للغاية في معاهد وهران وقسنطينة! المترشح الموثق الممثل لولاية ${selectedWilayaForAI} يُظهر تطابقاً استثنائياً ودقة فائقة في مهارة ${skillLabel}. لجنة التحكيم تشيد بالسرعة والمهارة للتنفيذ الفني واللوائح الفيدرالية لعام 2026.`,
      fr: `[TRANSMISSION OFFICIELLE] Démonstration pratique remarquable d'envergure nationale ! Le candidat de la Wilaya de ${selectedWilayaForAI} fait preuve d'une exactitude parfaite pour l'épreuve de ${skillLabel}. Le jury technique confirme l'excellence de sa méthodologie et du câblage structuré.`
    };

    // Attempt actual backend proxy fetch, fallback to instant local generation within 1 second to keep it super fast
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    try {
      const response = await fetch("/api/generate-updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillName: selectedSkillForAI,
          stage: "Selection Stage Hub",
          wilaya: selectedWilayaForAI
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      setAiCommentary(data.commentary || localFailsafe[lang]);
    } catch (err) {
      clearTimeout(timeoutId);
      setAiCommentary(localFailsafe[lang]);
    } finally {
      setLoadingCommentary(false);
    }
  };

  const totalRegisteredTrainees = SKILL_SPECIALTIES.reduce((sum, item) => sum + item.participantsCount, 0);
  const activeHubDetails = REGIONAL_HUBS.find(h => h.id === selectedHub);

  return (
    <div className="flex flex-col gap-6 text-neutral-100 p-1">
      
      {/* Visual Header Branding Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 p-5 sm:p-6 flex flex-col gap-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
              {lang === "ar" ? "بوابة مهارات الجزائر ومسابقات التميز المهني" : lang === "fr" ? "Portail Officiel des Olympiades" : "Official Algeria Vocational Olympiad"}
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
              {lang === "ar" ? "أولمبياد ورلد سكيلز الجزائر 2026" : "WorldSkills Algeria 2026"}
            </h2>
          </div>
          <div className="h-10 w-10 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Trophy size={18} />
          </div>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
          {lang === "ar" 
            ? "الجزائر، العضو الرسمي الـ 90 في المنظمة الدولية للمهارات WorldSkills، تفتخر بتسجيل ودعم خيرة الكفاءات الشابة عبر الـ 58 ولاية. يتنافس المترشحون الموهوبون لبلوغ النهائيات والظفر بتمثيل الراية الوطنية لمنتخب الجزائر في المحافل العالمية!"
            : lang === "fr"
            ? "L'Algérie, 90ème pays membre de l'organisation mondiale WorldSkills, orchestre la sélection de ses talents les plus prometteurs parmi ses 58 Wilayas. Les plus brillants se qualifieront pour les finales d'Oran afin de rejoindre l'équipe nationale algérienne."
            : "Algeria, the 90th official global member of WorldSkills, is searching for the absolute best technical talents across all 58 Wilayas. Competents compete targeting the Grand National Finals in Oran to register a spot on Team Algeria!"}
        </p>

        {/* Dynamic Countdown Section */}
        <div className="mt-1 bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Hourglass size={15} className="text-amber-400 animate-pulse" />
            <span className="text-[11px] text-neutral-400 font-sans font-medium">
              {lang === "ar" ? "النهائيات الكبرى بوهران بالتفصيل:" : lang === "fr" ? "Décompte Finales Oran :" : "Oran Finals Countdown:"}
            </span>
          </div>
          <span className="text-xs font-bold font-mono text-amber-400 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            {countdownText}
          </span>
        </div>
      </div>

      {/* Quick Stats Grid with Real Total Candidate count */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-neutral-900 border border-neutral-850 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <Users size={12} className="text-sky-400 font-bold" /> 
            {t.statFinalists}
          </span>
          <span className="text-base sm:text-lg font-bold font-mono mt-1 text-sky-400">{totalRegisteredTrainees}</span>
        </div>
        <div className="bg-neutral-900 border border-neutral-850 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <School size={12} className="text-emerald-400" /> 
            {t.statSpecialties}
          </span>
          <span className="text-base sm:text-lg font-bold font-mono mt-1 text-emerald-400">15 / 50+</span>
        </div>
        <div className="bg-neutral-900 border border-neutral-850 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <UsersRound size={12} className="text-amber-400" /> 
            58 Wilayas
          </span>
          <span className="text-base sm:text-lg font-bold font-mono mt-1 text-amber-400">58 / 58</span>
        </div>
      </div>

      {/* Real-time Places & Scoreboard Simulator Control Panel */}
      <div className="bg-gradient-to-r from-emerald-950/25 to-neutral-900 border border-emerald-500/20 rounded-xl p-4 flex flex-col gap-3 relative">
        <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[8px] bg-emerald-400/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono font-bold animate-pulse">
          <Zap size={9} />
          {lang === "ar" ? "تحديث تلقائي مفعّل" : lang === "fr" ? "AUTO-UPDATE ACTIF" : "REAL-TIME ACTIVE"}
        </div>
        
        <h3 className="text-xs font-bold font-mono text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
          <Award size={14} />
          {t.simulationControls}
        </h3>
        <p className="text-[11px] text-neutral-400 leading-normal">
          {lang === "ar" 
            ? "الموقع مبرمج لتلقي مستجدات فنية حقيقية كل 10 ثوانٍ عن المترشحين وولاياتهم. يمكنك فورا الضغط على الزر أدناه لإرسال تتويج عشوائي لمترشح آخر ورؤية إعادة ترتيب النقاط والولايات تلقائياً بصورة لحظية!"
            : lang === "fr"
            ? "Ce portail reçoit un flux d'activité toutes les 10 secondes. Cliquez ci-dessous pour forcer instantanément une épreuve gagnante, voir le tableau de classement national des Wilayas s'ajuster en direct !"
            : "The portal updates with new vocational candidate marks every 10 seconds. Click below to simulate an immediate elite award, and witness the national leaderboard standings rearrange in real-time."}
        </p>
        <button
          id="btn-simulate-win"
          onClick={onSimulate}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-2 rounded-lg text-xs transition-transform transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/5 select-none"
        >
          <Sparkles size={13} />
          {t.btnSimulateWinner}
        </button>
      </div>

      {/* Interactive Regional Hub Highlight System */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
        <h3 className="text-xs font-bold font-mono tracking-wider text-neutral-300 uppercase mb-2 flex items-center gap-1.5">
          <MapPin size={13} className="text-sky-400" />
          {t.liveMapTitle}
        </h3>
        <p className="text-[11px] text-neutral-400 mb-3">
          {t.liveMapDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 text-xs">
          {/* List of Hub Centers to Highlight */}
          <div className="flex flex-col gap-2">
            {REGIONAL_HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub.id)}
                className={`text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  selectedHub === hub.id 
                    ? `${hub.color} border-current font-bold`
                    : "bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{lang === "ar" ? hub.nameAr : hub.name}</span>
                  <ChevronRight size={13} className={selectedHub === hub.id ? "rotate-90 transition-transform" : ""} />
                </div>
              </button>
            ))}
          </div>

          {/* Visual Geography Highlighter Area */}
          <div className="bg-neutral-950/80 rounded-xl border border-neutral-850 p-4 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase block font-mono">
                {t.mapSelectedHub}
              </span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">
                {lang === "ar" ? activeHubDetails?.nameAr : activeHubDetails?.name}
              </span>
              
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeHubDetails?.wilayas.map((wil) => {
                  const matchingW = wilayaList.find(w => w.name.toLowerCase().includes(wil.toLowerCase()) || wil.toLowerCase().includes(w.name.toLowerCase()));
                  return (
                    <span 
                      key={wil} 
                      className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-sans font-medium"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {lang === "ar" && matchingW ? matchingW.arabicName : wil}
                    </span>
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] text-neutral-500 italic font-sans border-t border-neutral-900 pt-2.5">
              {lang === "ar" 
                ? "*المنتسبون المؤهلون من هذه الولايات يتوجهون للتصفيات الإقليمية داخل مقر هذا القطب." 
                : "*Trainees from these designated Wilayas are routed to compete directly inside this hub."}
            </p>
          </div>
        </div>
      </div>

      {/* FULL DETAILED INFORMATIVE LIST: Candidate count in every single domain */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
        <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
          <h3 className="text-xs font-bold font-mono tracking-wider text-neutral-300 uppercase flex items-center gap-1.5">
            <Users size={14} className="text-rose-400" />
            {lang === "ar" ? "حصيلة المترشحين المسجلين لكل اختصاص" : lang === "fr" ? "Nombre de Candidats par Domaine" : "Candidate Density per Specialty Domain"}
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono bg-neutral-950 px-2.5 py-1 rounded border border-neutral-850">
            {lang === "ar" ? "طاقم المترشحين الإجمالي:" : lang === "fr" ? "Total inscrits :" : "Total Candidates :"} <strong className="text-emerald-400">{totalRegisteredTrainees}</strong>
          </span>
        </div>

        <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">
          {lang === "ar"
            ? "نعرض أدناه البيانات الإحصائية الرسمية الصادرة عن نظام التسجيل بوزارة التكوين لعدد المترشحين الفعليين المتنافسين بعد اجتياز مرحلة التحقق الأولي لكل اختصاص مهني للفوز بكأس التميز الوطني:"
            : lang === "fr"
            ? "Répartition détaillée des effectifs d'étudiants officiels et validés par le Ministère de la formation professionnelle engagés dans les 15 disciplines principales :"
            : "Below is the official candidate volume metrics mapped to the 15 core technical disciplines competing for the coveted spots on Team Algeria:"}
        </p>

        {/* Scrollable list of domains with exact participant counts */}
        <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 bg-neutral-950 rounded-xl p-2.5 border border-neutral-850 flex flex-col gap-2">
          {SKILL_SPECIALTIES.map((spec) => {
            const pct = Math.round((spec.participantsCount / totalRegisteredTrainees) * 100);
            return (
              <div 
                key={spec.name} 
                className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 transition-colors gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">
                      {spec.sector}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white block truncate mt-1">
                    {lang === "ar" ? spec.arabicName : spec.name}
                  </span>
                </div>
                
                {/* Count and indicator */}
                <div className="shrink-0 text-right flex items-center gap-3">
                  <div className="hidden sm:block">
                    <div className="w-16 bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${pct * 3}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                      {spec.participantsCount} {lang === "ar" ? "مترشح" : lang === "fr" ? "candidats" : "trainees"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive AI Broadcast Box */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4 flex flex-col gap-3 relative">
        <div className="flex items-center gap-2 text-rose-400">
          <Radio size={15} className="animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider font-mono">
            {lang === "ar" ? "راديو وتلفزيون البث التفاعلي الفوري" : lang === "fr" ? "Radio de Commentaire en Direct" : "AI Regional Broadcast Radio Link"}
          </span>
        </div>

        <p className="text-xs text-neutral-400 leading-normal">
          {lang === "ar"
            ? "اختر مجال المهارة والولاية لتوليد تقرير وطني فوري شامل عن سير المنافسة والورشات الحركية:"
            : lang === "fr"
            ? "Formulez un compte-rendu d'évaluation instantané. Choisissez une spécialité technique et une Wilaya :"
            : "Generate a live simulated assessment report and news flash locally in 1 second. Pick a discipline & Wilaya:"}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-1">
          {/* Skill Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-500 uppercase font-sans">{t.regSelectedSkill}</label>
            <select
              id="select-broadcast-skill"
              value={selectedSkillForAI}
              onChange={(e) => setSelectedSkillForAI(e.target.value)}
              className="bg-neutral-850 border border-neutral-800 text-xs rounded-lg p-2 text-neutral-200 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {SKILL_SPECIALTIES.map((spec) => (
                <option key={spec.name} value={spec.name}>
                  {lang === "ar" ? spec.arabicName : spec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Wilaya Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-500 uppercase font-sans">Wilaya</label>
            <select
              id="select-broadcast-wilaya"
              value={selectedWilayaForAI}
              onChange={(e) => setSelectedWilayaForAI(e.target.value)}
              className="bg-neutral-850 border border-neutral-800 text-xs rounded-lg p-2 text-neutral-200 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="Oran">31 - Oran (وهران)</option>
              <option value="Algiers">16 - Algiers (الجزائر)</option>
              <option value="Constantine">25 - Constantine (قسنطينة)</option>
              <option value="Tlemcen">13 - Tlemcen (تلمسان)</option>
              <option value="Sétif">19 - Sétif (سطيف)</option>
              <option value="Ghardaïa">47 - Ghardaïa (غرداية)</option>
              <option value="Béchar">08 - Béchar (بشار)</option>
              <option value="Ouargla">30 - Ouargla (ورقلة)</option>
              <option value="Béjaïa">06 - Béjaïa (بجاية)</option>
              <option value="Annaba">23 - Annaba (عنابة)</option>
            </select>
          </div>
        </div>

        <button
          id="btn-trigger-broadcast"
          onClick={generateAICommentary}
          disabled={loadingCommentary}
          className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-lg border border-rose-500/20"
        >
          {loadingCommentary ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              {lang === "ar" ? "جاري صياغة البث الجزائري..." : lang === "fr" ? "Ajustement de la fréquence..." : "Translating Frequency..."}
            </>
          ) : (
            <>
              <Tv size={13} />
              {lang === "ar" ? "اربط الاتصال التلفزيوني بالتقييم" : lang === "fr" ? "Lancer le Rapport Alternatif" : "Request Live Report"}
            </>
          )}
        </button>

        {aiCommentary && (
          <div className="bg-neutral-950/90 border border-neutral-850 rounded-lg p-3 text-xs text-rose-300 italic leading-relaxed font-sans relative">
            <span className="absolute -top-2 right-3 px-1.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-mono rounded-md uppercase">
              {lang === "ar" ? "بث حي" : "LIVE FEED"}
            </span>
            {aiCommentary}
          </div>
        )}
      </div>

      {/* Roadmaps Stage */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
        <h3 className="text-xs font-bold font-mono tracking-wider text-neutral-300 uppercase mb-4 flex items-center justify-between">
          <span>{lang === "ar" ? "الخط الزمني وخارطة الطريق الرسمية" : "Olympiad Roadmap Stages"}</span>
          <span className="text-emerald-400 text-[10px]">worldskills.mvet.dz</span>
        </h3>

        <div className="flex flex-col gap-4">
          {STAGES_EXPLANATION.map((stg) => {
            const isCompleted = stg.status === "Completed";
            const isInProgress = stg.status === "In Progress";
            const stageTitle = lang === "ar" ? stg.titleAr : lang === "fr" ? (stg.phase === 1 ? "Inscription En Ligne" : stg.phase === 2 ? "Sélections Wilayales" : stg.phase === 3 ? "Pôles Régionaux" : "Finales Nationales") : stg.titleKnob;
            const stageDescLoc = lang === "ar" ? stg.titleAr : lang === "fr" ? (stg.phase === 1 ? "Les stagiaires s'inscrivent en ligne sur la plateforme. Validation directe par les INSFP régionaux." : stg.phase === 2 ? "Ateliers intensifs pratiques dans les CFPA des 58 Wilayas." : stg.phase === 3 ? "Les lauréats s'affrontent dans 5 pôles de regroupement régionaux." : "Les meilleurs se réunissent à Oran pour former l'équipe nationale.") : stg.desc;
            
            return (
              <div key={stg.phase} className="flex gap-3 items-start group">
                <div className="flex flex-col items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    isCompleted 
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                      : isInProgress 
                        ? "bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse" 
                        : "bg-neutral-800 border-neutral-700 text-neutral-500"
                  }`}>
                    {stg.phase}
                  </div>
                  {stg.phase < 4 && <div className="w-[1.5px] h-12 bg-neutral-800 group-hover:bg-neutral-700 transition-colors" />}
                </div>

                <div className="flex-1 min-w-0 bg-neutral-950/45 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white truncate">
                      {stageTitle}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                      isCompleted 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : isInProgress 
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                          : "bg-neutral-800 text-neutral-500"
                    }`}>
                      {stg.status === "Completed" ? (lang === "ar" ? "مكتملة" : "Completed") : stg.status === "In Progress" ? (lang === "ar" ? "جارية حالياً" : "In Progress") : (lang === "ar" ? "قادمة" : "Upcoming")}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    {stageDescLoc}
                  </p>
                  <p className="text-[9px] text-neutral-500 mt-1.5 font-mono">
                    {lang === "ar" ? "الفترة:" : "Timeline:"} {stg.period}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
