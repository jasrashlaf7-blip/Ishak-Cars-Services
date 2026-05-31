import React, { useState } from "react";
import { getAll58Wilayas, SKILL_SPECIALTIES } from "../data";
import { TraineeProfile } from "../types";
import { translations, Language } from "../translations";
import { UserCheck, ShieldCheck, Download, Award, School, MapPin, Sparkles, Building2, Code, FileCheck } from "lucide-react";

interface RegistrationTabProps {
  lang: Language;
}

export default function RegistrationTab({ lang }: RegistrationTabProps) {
  const wilayaOptions = getAll58Wilayas();

  const t = translations[lang];

  // Initial dummy state or user register input
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("2003-04-12");
  const [selectedWilayaCode, setSelectedWilayaCode] = useState<number>(16); // Algiers by default
  const [institution, setInstitution] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(SKILL_SPECIALTIES[0].name);

  // Form result states
  const [isRegistered, setIsRegistered] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<TraineeProfile | null>(null);
  const [successToast, setSuccessToast] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !institution) return;

    const mockProfile: TraineeProfile = {
      fullName,
      birthDate,
      wilayaCode: selectedWilayaCode,
      institution,
      specialization: selectedSkill,
      validationStatus: "Validated", // Real validation workflow simulation
    };

    setGeneratedProfile(mockProfile);
    setIsRegistered(true);
  };

  const handleDownloadSimulation = () => {
    const msg = lang === "ar" 
      ? `تم حفظ بطاقة الاشتراك الرقمية بنجاح تحت المعرّف:  ${regCardId}`
      : lang === "fr"
      ? `Badge enregistré dans votre espace de stockage temporaire ! Réf: ${regCardId}`
      : `Digital membership pass downloaded successfully locally! Assigned Ref: ${regCardId}`;
    
    setSuccessToast(msg);
    // Auto clear after 4 seconds
    setTimeout(() => {
      setSuccessToast("");
    }, 4500);
  };

  const selectedWilayaObj = wilayaOptions.find(w => w.code === selectedWilayaCode);
  const formattedWilayaCode = String(selectedWilayaCode).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const regCardId = `WS-DZD-${formattedWilayaCode}-${randomSuffix}`;

  return (
    <div className="flex flex-col gap-5 text-neutral-100 p-1">
      
      {/* Tab Header Box */}
      <div className="border-b border-neutral-850 pb-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <UserCheck className="text-emerald-400" size={18} />
          {t.regTitle}
        </h2>
        <p className="text-xs text-neutral-400">
          {t.regSubtitle}
        </p>
      </div>

      {successToast && (
        <div className="bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-300 rounded-xl p-3 text-xs flex items-center gap-2 animate-fade-in">
          <FileCheck size={16} className="text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {!isRegistered ? (
        /* Dynamic Portal Registration Form Mock */
        <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-2xl border border-neutral-800 p-5 flex flex-col gap-4">
          <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-3 flex gap-2.5 items-start">
            <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={15} />
            <div className="flex flex-col">
              <span className="text-xs text-emerald-400 font-bold font-mono">
                {lang === "ar" ? "محاكاة التسجيل في البوابة الإلكترونية" : "STAGE 1 ENROLLMENT MOCKUP"}
              </span>
              <p className="text-[11px] text-neutral-300 mt-0.5 leading-normal">
                {lang === "ar" 
                  ? "املأ استمارة التحقق من المترشح للمحاكاة وتفعيل حساب مشاركة مهنية رسمي عبر إحدى الـ 58 ولاية."
                  : lang === "fr"
                  ? "Veuillez remplir le formulaire d'inscription pour simuler l'enregistrement d'un candidat dans sa Wilaya."
                  : "Fill out the candidate validation questionnaire below to simulate the activation of a trainee participant account across the 58 Wilayas."}
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
              {t.regFullName}
            </label>
            <input
              id="input-reg-name"
              type="text"
              required
              placeholder="e.g. Youssef Benabdellaoui"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-xs rounded-xl p-2.5 text-neutral-200 outline-none focus:border-emerald-500 text-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* DOB */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                {t.regDob}
              </label>
              <input
                id="input-reg-dob"
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded-xl p-2.5 text-neutral-200 outline-none focus:border-emerald-500"
              />
            </div>

            {/* Select 58 Wilaya */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                {t.regWilaya}
              </label>
              <select
                id="select-reg-wilaya"
                value={selectedWilayaCode}
                onChange={(e) => setSelectedWilayaCode(Number(e.target.value))}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded-xl p-2.5 text-neutral-200 outline-none focus:border-emerald-500 cursor-pointer"
              >
                {wilayaOptions.map((wilaya) => (
                  <option key={wilaya.code} value={wilaya.code}>
                    {String(wilaya.code).padStart(2, '0')} - {lang === "ar" ? wilaya.arabicName : wilaya.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vocational Institution school */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
              {t.regInstitute}
            </label>
            <input
              id="input-reg-institution"
              type="text"
              required
              placeholder="e.g. INSFP El-Kala / Constantine 1"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-xs rounded-xl p-2.5 text-neutral-200 outline-none focus:border-emerald-500 text-sans"
            />
          </div>

          {/* Specialty */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
              {t.regSelectedSkill}
            </label>
            <select
              id="select-reg-skill"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-xs rounded-xl p-2.5 text-neutral-200 outline-none focus:border-emerald-500 cursor-pointer"
            >
              {SKILL_SPECIALTIES.map((spec) => (
                <option key={spec.name} value={spec.name}>
                  {lang === "ar" ? spec.arabicName : spec.name}
                </option>
              ))}
            </select>
          </div>

          <button
            id="btn-submit-registration"
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
          >
            <Sparkles size={14} />
            {t.regSubmitButton}
          </button>
        </form>
      ) : (
        /* Digital Participant Card Representation */
        <div className="flex flex-col gap-4 items-center animate-fade-in">
          
          {/* Authentic Qualification Pass Badge */}
          <div className="w-full max-w-[340px] bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-emerald-500/60 rounded-3xl p-5 shadow-2xl relative flex flex-col gap-4 overflow-hidden">
            
            {/* Top Security watermark background */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/[0.03] rounded-full pointer-events-none" />

            {/* Republic header and MVET stamp */}
            <div className="text-center flex flex-col items-center pb-2.5 border-b border-neutral-850">
              <span className="text-[8px] font-semibold text-emerald-400 uppercase tracking-widest leading-none font-sans">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </span>
              <span className="text-[7px] text-neutral-400 mt-1 uppercase font-mono tracking-tight leading-none text-center">
                Ministry of Vocational Training and Education • وزارة التكوين
              </span>
              <div className="mt-2 text-[9px] font-bold text-white px-3 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1 leading-none">
                <ShieldCheck size={11} className="text-emerald-400" />
                {lang === "ar" ? "بطاقة تأهيل رسمية" : "OFFICIAL ENTRY PASS"}
              </div>
            </div>

            {/* Candidate Mugshot Simulator */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-neutral-800 to-neutral-700/80 border border-neutral-600 flex items-center justify-center relative shrink-0">
                <span className="text-2xl font-bold font-mono text-neutral-300">
                  {generatedProfile?.fullName.slice(0, 1).toUpperCase()}
                </span>
                <div className="absolute bottom-1 right-1 bg-emerald-500 h-2.5 w-2.5 rounded-full border border-neutral-950 animate-pulse" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[9px] text-emerald-400 font-mono block uppercase leading-none mb-1 font-bold">
                  {lang === "ar" ? "مترشح مؤهل" : "Candidate Finalist"}
                </span>
                <h4 className="text-sm font-bold text-white truncate leading-tight select-all">
                  {generatedProfile?.fullName}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-0.5 truncate flex items-center gap-1 leading-normal font-sans">
                  <span className="bg-emerald-500/10 px-1 py-0.2 rounded font-mono font-semibold text-[9px] text-emerald-400">
                    {formattedWilayaCode}
                  </span>
                  {lang === "ar" ? selectedWilayaObj?.arabicName : selectedWilayaObj?.name} {lang === "ar" ? "الولاية" : "Province"}
                </p>
              </div>
            </div>

            {/* Main credentials fields */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-850 text-xs">
              <div className="flex flex-col">
                <span className="text-[8px] text-neutral-500 tracking-wider uppercase flex items-center gap-0.5 font-sans">
                  <Code size={9} /> {lang === "ar" ? "الاختصاص" : "Specialty"}
                </span>
                <span className="text-[11px] font-bold text-neutral-100 truncate mt-0.5" title={generatedProfile?.specialization}>
                  {(() => {
                    const matchS = SKILL_SPECIALTIES.find(s => s.name === generatedProfile?.specialization);
                    return lang === "ar" && matchS ? matchS.arabicName : generatedProfile?.specialization;
                  })()}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[8px] text-neutral-500 tracking-wider uppercase flex items-center gap-0.5 font-sans">
                  <Building2 size={9} /> {lang === "ar" ? "المعهد" : "Institute"}
                </span>
                <span className="text-[11px] font-semibold text-neutral-200 truncate mt-0.5">
                  {generatedProfile?.institution}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[8px] text-neutral-500 tracking-wider uppercase font-mono">
                  {lang === "ar" ? "الرقم التسلسلي" : "Serial ID"}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-tight mt-0.5">
                  {regCardId}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[8px] text-neutral-500 tracking-wider uppercase font-mono">
                  {lang === "ar" ? "التحقق الوطني" : "Verification"}
                </span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-1.5 py-0.2 rounded self-start mt-0.5">
                  {lang === "ar" ? "عضوية مفعلة" : "VALID MEMBER"}
                </span>
              </div>
            </div>

            {/* Mini Footer Pass Code */}
            <div className="flex justify-between items-center text-[7px] text-neutral-500 font-mono pt-1">
              <span>90th member federation</span>
              <span>ISSUED MAY 2026</span>
            </div>

          </div>

          {/* Controls below pass */}
          <div className="flex gap-2 w-full max-w-[340px]">
            <button
              id="btn-register-another-candidate"
              onClick={() => setIsRegistered(false)}
              className="flex-1 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 text-xs py-2 rounded-xl border border-neutral-800 cursor-pointer text-center select-none"
            >
              {lang === "ar" ? "تسجيل مترشح آخر" : "Enroll Another Profile"}
            </button>
            <button
              id="btn-download-pass-simulation"
              onClick={handleDownloadSimulation}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs py-2 rounded-xl cursor-pointer flex items-center justify-center gap-1 select-none"
            >
              <Download size={13} />
              {lang === "ar" ? "حفظ البطاقة" : "Save Pass"}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
