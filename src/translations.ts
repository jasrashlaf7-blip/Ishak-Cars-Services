export type Language = "en" | "ar" | "fr";

export interface TranslationSet {
  // Common
  brandMinistry: string;
  brandTitle: string;
  brandSubtitle: string;
  activeSession: string;
  emulatorApk: string;
  emulatorWeb: string;
  urlPlaceholder: string;
  activeTabLabel: string;
  searchPlaceholder: string;
  focusLabel: string;
  scoreLabel: string;
  goldLabel: string;
  silverLabel: string;
  bronzeLabel: string;
  totalLabel: string;
  resetButton: string;
  submitButton: string;
  cancelButton: string;

  // Tabs Header
  tabHub: string;
  tabSchedules: string;
  tabStandings: string;
  tabSyllabus: string;
  tabBadge: string;
  tabAiGuide: string;

  // Hub / Dashboard
  hubTitle: string;
  hubSubtitle: string;
  statFinalists: string;
  statSpecialties: string;
  statStages: string;
  statTotalMedals: string;
  trackerTitle: string;
  trackerSubtitle: string;
  visualTickerTitle: string;
  simulationControls: string;
  btnSimulateWinner: string;
  liveMapTitle: string;
  liveMapDesc: string;
  mapSelectedHub: string;
  mapSelectHint: string;

  // Schedules
  schTitle: string;
  schSubtitle: string;
  schSimulateBtn: string;
  schAddTitle: string;
  schEngName: string;
  schArabName: string;
  schSectorGroup: string;
  schOlympiadStage: string;
  schVenueLabel: string;
  schDateLabel: string;
  schInsertBtn: string;
  schSectorHeaders: string;
  schCompleted: string;
  schOngoing: string;
  schUpcoming: string;
  schRepresentedWilayas: string;

  // Medals
  medTitle: string;
  medSubtitle: string;
  medPowerTitle: string;
  medSortTitle: string;
  medCodeSort: string;
  medGridHeader: string;

  // Syllabus / Skills
  sylTitle: string;
  sylSubtitle: string;
  sylDescTitle: string;
  sylStandardsTitle: string;
  sylBlueprintTitle: string;
  sylBlueprintDesc: string;

  // Registration Portal
  regTitle: string;
  regSubtitle: string;
  regFormTitle: string;
  regFormDesc: string;
  regFullName: string;
  regDob: string;
  regWilaya: string;
  regInstitute: string;
  regSelectedSkill: string;
  regSubmitButton: string;
  regPassHeaderAr: string;
  regPassHeaderEn: string;
  regPassEntryPass: string;
  regPassCandidate: string;
  regPassSpecialty: string;
  regPassTrainNode: string;
  regPassSerial: string;
  regPassStatus: string;
  regPassStatusValid: string;
  regPassFooter: string;
  regPassIssued: string;
  regPassEnrollAnother: string;
  regPassSave: string;

  // Guidance Advisor
  aiAdvisorTitle: string;
  aiAdvisorSub: string;
  aiNoticeBanner: string;
  aiPlaceholder: string;
  aiQuickQueries: string;
  aiComposing: string;
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    brandMinistry: "Republic of Algeria • Ministry of Vocational Training",
    brandTitle: "وزارة التكوين والتعليم المهنيين",
    brandSubtitle: "WorldSkills Algeria 2026 Portal",
    activeSession: "Active Session: 2026 Live",
    emulatorApk: "Android APK Emulator",
    emulatorWeb: "Responsive Web App",
    urlPlaceholder: "https://worldskills.mvet.dz/apps/algeria2026",
    activeTabLabel: "Active Tab",
    searchPlaceholder: "Search or filter items...",
    focusLabel: "Focus:",
    scoreLabel: "Score:",
    goldLabel: "Gold",
    silverLabel: "Silver",
    bronzeLabel: "Bronze",
    totalLabel: "Total Medals",
    resetButton: "Reset Board",
    submitButton: "Submit",
    cancelButton: "Cancel",

    tabHub: "National Hub",
    tabSchedules: "Schedules",
    tabStandings: "Standings",
    tabSyllabus: "Syllabus",
    tabBadge: "Badge Portal",
    tabAiGuide: "AI Guide",

    hubTitle: "National Hub Overview",
    hubSubtitle: "Real-time Algeria Vocational Tracking System",
    statFinalists: "Active Trainees",
    statSpecialties: "Specialties",
    statStages: "Olympiad Stages",
    statTotalMedals: "Total Medals",
    trackerTitle: "National Selection Feed & Live Simulated Ticker",
    trackerSubtitle: "Real-time event occurrences across 58 Wilayas",
    visualTickerTitle: "Simulated Live Activity Stream",
    simulationControls: "Simulation Panel",
    btnSimulateWinner: "Simulate Live Team Winner Match",
    liveMapTitle: "Interactive Regional Hub Map",
    liveMapDesc: "Select a regional hub to highlight associated competing Wilayas",
    mapSelectedHub: "Selected Center Hub",
    mapSelectHint: "Click hubs on the right to visualize geography groups",

    schTitle: "Skill Event Schedules",
    schSubtitle: "National & regional selection workshops",
    schSimulateBtn: "Simulate Event",
    schAddTitle: "Add Trainee Live Special Selection Workshop",
    schEngName: "Specialty English",
    schArabName: "Specialty Arabic",
    schSectorGroup: "Sector Group",
    schOlympiadStage: "Olympiad Stage",
    schVenueLabel: "Physical Venue Hub",
    schDateLabel: "Date Range / Period",
    schInsertBtn: "Insert Simulated Olympiad Event",
    schSectorHeaders: "Sector Groups:",
    schCompleted: "Finished",
    schOngoing: "ONGOING AT WORKSHOP",
    schUpcoming: "Upcoming Stage Setup",
    schRepresentedWilayas: "Represented Wilayas",

    medTitle: "National Medal Standings",
    medSubtitle: "Wilayatal vocational training elite scoreboard",
    medPowerTitle: "Top 5 Regional Leaderboard Power Ranking",
    medSortTitle: "Sort Standings:",
    medCodeSort: "Wilaya Code",
    medGridHeader: "Algerian Wilayas Medal Grid",

    sylTitle: "Core Specialities & Skills Catalog",
    sylSubtitle: "Official competition syllabus representing technical disciplines",
    sylDescTitle: "Technical Description & Overview",
    sylStandardsTitle: "International Assessment Standards",
    sylBlueprintTitle: "National Finals Practical Test Blueprint",
    sylBlueprintDesc: "Algerian finalists are given 18 hours spread across 3 to 4 days to complete a fully functional physical or digital deliverable with sub-millimeter precision.",

    regTitle: "Digital Candidate Validation Portal",
    regSubtitle: "WorldSkills Algeria 2026 digital enrollment system (M.V.E.T. DZ)",
    regFormTitle: "STAGE 1 ENROLLMENT MOCKUP",
    regFormDesc: "Fill out the candidate validation questionnaire below to simulate the activation of a trainee participant account across the 58 Wilayas.",
    regFullName: "Candidate Full Name (English or Arabic)",
    regDob: "Date of Birth",
    regWilaya: "Representing Wilaya",
    regInstitute: "Vocational Training Institute / INSFP node",
    regSelectedSkill: "Specialization / Selected Skill",
    regSubmitButton: "Validate Profile & Print Digital Entry Badge",
    regPassHeaderAr: "الجمهورية الجزائرية الديمقراطية الشعبية",
    regPassHeaderEn: "Ministry of Vocational Training and Education",
    regPassEntryPass: "OFFICIAL ENTRY PASS",
    regPassCandidate: "Candidate Finalist",
    regPassSpecialty: "Specialty Skill",
    regPassTrainNode: "Training Node",
    regPassSerial: "Serial Number",
    regPassStatus: "Status Verified",
    regPassStatusValid: "VALID MEMBERSHIP",
    regPassFooter: "90th member federation",
    regPassIssued: "ISSUED MAY 2026",
    regPassEnrollAnother: "Enroll Another Profile",
    regPassSave: "Save Mobile Pass",

    aiAdvisorTitle: "Multilingual Advisor",
    aiAdvisorSub: "Official Instructor Board • المرشد الافتراضي",
    aiNoticeBanner: "Technical criteria correspond to WorldSkills WSC specifications under strict oversight of the Ministry.",
    aiPlaceholder: "Ask Advisor in Arabic, French or English...",
    aiQuickQueries: "Smart Quick Queries:",
    aiComposing: "Advisor is composing answer..."
  },
  ar: {
    brandMinistry: "الجمهورية الجزائرية الديمقراطية الشعبية • وزارة التكوين",
    brandTitle: "وزارة التكوين والتعليم المهنيين",
    brandSubtitle: "بوابة ورلد سكيلز الجزائر 2026",
    activeSession: "الدورة النشطة: مباشر 2026",
    emulatorApk: "محاكي تطبيق أندرويد APK",
    emulatorWeb: "تطبيق ويب متجاوب",
    urlPlaceholder: "https://worldskills.mvet.dz/apps/algeria2026",
    activeTabLabel: "التبويب النشط",
    searchPlaceholder: "البحث والتصفية...",
    focusLabel: "التركيز المهني:",
    scoreLabel: "النقاط:",
    goldLabel: "ذهبية",
    silverLabel: "فضية",
    bronzeLabel: "برونزية",
    totalLabel: "إجمالي الميداليات",
    resetButton: "إعادة ضبط اللوحة",
    submitButton: "إرسال",
    cancelButton: "إلغاء",

    tabHub: "المركز الوطني",
    tabSchedules: "التوقيت",
    tabStandings: "الترتيب",
    tabSyllabus: "التخصصات",
    tabBadge: "بوابة البطاقة",
    tabAiGuide: "المرشد الذكي",

    hubTitle: "نظرة عامة على المركز الوطني",
    hubSubtitle: "نظام التتبع والتحليل الفوري للمهارات المهنية بالجزائر",
    statFinalists: "المترشحون النشطون",
    statSpecialties: "التخصصات المهنية",
    statStages: "مراحل الأولمبياد",
    statTotalMedals: "إجمالي الميداليات",
    trackerTitle: "آخر النتائج والمستجدات وتحديث المنافسة الآني",
    trackerSubtitle: "تسجيل فوري للأحداث والمنافسات عبر 58 ولاية",
    visualTickerTitle: "بث الأنشطة والفعاليات المحاكي",
    simulationControls: "لوحة التحكم بالمحاكاة",
    btnSimulateWinner: "محاكاة تتويج بطل ولائي فوري",
    liveMapTitle: "الخريطة التفاعلية للمراكز الجهوية",
    liveMapDesc: "اختر مركزاً جهوياً لتسليط الضوء على الولايات المشاركة التابعة له",
    mapSelectedHub: "المركز الإقليمي المحدد",
    mapSelectHint: "اضغط على المراكز في اليمين لعرض التوزيع الجغرافي للولايات",

    schTitle: "جدول مواعيد الفعاليات والمهارات",
    schSubtitle: "ورشات العمل والتصفيات الوطنية والإقليمية للنهائيات",
    schSimulateBtn: "إضافة حدث محاكى",
    schAddTitle: "إضافة ورشة عمل اختيار خاصة بالمترشحين",
    schEngName: "اسم التخصص بالإنجليزية",
    schArabName: "اسم التخصص بالعربية",
    schSectorGroup: "قطاع الاختصاص",
    schOlympiadStage: "مرحلة الأولمبياد",
    schVenueLabel: "مقر الورشة الفوري",
    schDateLabel: "الفترة الزمنية للحدث",
    schInsertBtn: "إدراج الحدث في الجدول المحاكى",
    schSectorHeaders: "قطاعات التخصصات المتاحة:",
    schCompleted: "انتهت المنافسة",
    schOngoing: "المنافسة جارية حالياً",
    schUpcoming: "مرحلة التحضير والإعداد",
    schRepresentedWilayas: "الولايات الممثلة للورشة",

    medTitle: "جدول ترتيب الميداليات الوطني",
    medSubtitle: "لوحة الشرف الوطنية للتكوين والتعليم المهنيين بالجزائر",
    medPowerTitle: "ترتيب القوة والمراكز الخمسة الأولى إقليمياً",
    medSortTitle: "ترتيب الجدول حسب:",
    medCodeSort: "رقم الولاية",
    medGridHeader: "مجموع الميداليات لجميع الولايات الجزائرية",

    sylTitle: "دليل المهارات والتخصصات الرسمية",
    sylSubtitle: "المناهج والمعايير الرسمية المعتمدة لأكثر من 50 تخصصاً تقنياً",
    sylDescTitle: "الوصف التقني ونظرة عامة على المهارة",
    sylStandardsTitle: "معايير التقييم الدولية المعتمدة",
    sylBlueprintTitle: "مخطط الاختبار العملي للنهائيات الوطنية",
    sylBlueprintDesc: "يمنح المتأهلون الجزائريون 18 ساعة كاملة موزعة على 3 إلى 4 أيام لإنجاز مشروع تقني متكامل تتوفر فيه أعلى شروط الدقة والتطابق مع معايير الملليمتر الجزئي.",

    regTitle: "بوابة التحقق الرقمي من بطاقات المترشحين",
    regSubtitle: "نظام التسجيل والتحقق لوزارة التكوين والتعليم المهنيين لأولمبياد 2026",
    regFormTitle: "محاكاة استمارة التسجيل والتحقق الرقمي",
    regFormDesc: "يرجى ملء الاستمارة أدناه لمحاكاة تفعيل حساب مشترك في مسابقات التميز المهني عبر الـ 58 ولاية.",
    regFullName: "الاسم واللقب الكامل للمترشح (بالعربية أو الإنجليزية)",
    regDob: "تاريخ الميلاد",
    regWilaya: "الولاية التي يمثلها",
    regInstitute: "المعهد الوطني المتخصص في التكوين المهني / INSFP الملحق",
    regSelectedSkill: "التخصص التقني أو المهارة المحددة",
    regSubmitButton: "التحقق من الملف وطباعة بطاقة الدخول الرقمية",
    regPassHeaderAr: "الجمهورية الجزائرية الديمقراطية الشعبية",
    regPassHeaderEn: "Ministry of Vocational Training and Education",
    regPassEntryPass: "بطاقة دخول رسمية للمسابقات",
    regPassCandidate: "المترشح المؤهل للنهائيات",
    regPassSpecialty: "المهارة والتخصص",
    regPassTrainNode: "معهد التكوين الملحق",
    regPassSerial: "الرقم التسلسلي للبطاقة",
    regPassStatus: "حالة التحقق والفعالية",
    regPassStatusValid: "عضوية مسجلة وموثقة",
    regPassFooter: "الممثل الوطني الـ 90 في المنظمة الدولية",
    regPassIssued: "تاريخ الإصدار مايو 2026",
    regPassEnrollAnother: "تسجيل ملف مترشح آخر",
    regPassSave: "حفظ بطاقة المرور على الهاتف",

    aiAdvisorTitle: "المرشد التفاعلي الذكي",
    aiAdvisorSub: "المشرف الوطني التقني الموجه • المرشد الرقمي",
    aiNoticeBanner: "المعايير التقنية تتطابق تماماً مع معايير المسابقة الدولية WorldSkills وتحت رعاية الوزارة الوصية.",
    aiPlaceholder: "اطرح سؤالك باللغة العربية، الفرنسية أو الإنجليزية...",
    aiQuickQueries: "أسئلة سريعة شائعة الاستفسار:",
    aiComposing: "المرشد الذكي يقوم الآن بصياغة الإجابة والتحليل التقني..."
  },
  fr: {
    brandMinistry: "République d'Algérie • Ministère de la Formation",
    brandTitle: "وزارة التكوين والتعليم المهنيين",
    brandSubtitle: "Portail WorldSkills Algérie 2026",
    activeSession: "Session Active: 2026 En Direct",
    emulatorApk: "Émulateur APK Android",
    emulatorWeb: "Application Web Responsive",
    urlPlaceholder: "https://worldskills.mvet.dz/apps/algeria2026",
    activeTabLabel: "Onglet Actif",
    searchPlaceholder: "Rechercher ou filtrer...",
    focusLabel: "Spécialité:",
    scoreLabel: "Score:",
    goldLabel: "Or",
    silverLabel: "Argent",
    bronzeLabel: "Bronze",
    totalLabel: "Total Médailles",
    resetButton: "Réinitialiser",
    submitButton: "Soumettre",
    cancelButton: "Annuler",

    tabHub: "Moyeu National",
    tabSchedules: "Planning",
    tabStandings: "Classement",
    tabSyllabus: "Spécialités",
    tabBadge: "Portail Pass",
    tabAiGuide: "Guide IA",

    hubTitle: "Aperçu du Centre National",
    hubSubtitle: "Système de suivi en temps réel de la formation en Algérie",
    statFinalists: "Candidats Actifs",
    statSpecialties: "Spécialités",
    statStages: "Phases Olympiades",
    statTotalMedals: "Total Médailles",
    trackerTitle: "Fil d'actualité en direct et simulation d'événements",
    trackerSubtitle: "Événements en cours dans les 58 Wilayas",
    visualTickerTitle: "Flux d'Activité Simulé en Direct",
    simulationControls: "Panneau de Simulation",
    btnSimulateWinner: "Simuler un vainqueur régional en direct",
    liveMapTitle: "Carte Interactive des Pôles Régionaux",
    liveMapDesc: "Sélectionnez un pôle régional pour afficher les Wilayas de cette division",
    mapSelectedHub: "Division Régionale",
    mapSelectHint: "Cliquez sur les pôles à droite pour visualiser la répartition géographique",

    schTitle: "Calendrier des Épreuves",
    schSubtitle: "Ateliers et sessions de sélection nationale",
    schSimulateBtn: "Simuler Événement",
    schAddTitle: "Ajouter un Atelier de Sélection Pratique",
    schEngName: "Spécialité en Anglais",
    schArabName: "Spécialité en Arabe",
    schSectorGroup: "Secteur",
    schOlympiadStage: "Phase d'Olympiade",
    schVenueLabel: "Lieu du Pôle Pratique",
    schDateLabel: "Dates de l'Événement",
    schInsertBtn: "Insérer l'Événement Simulé",
    schSectorHeaders: "Secteurs de Compétences :",
    schCompleted: "Épreuve Terminée",
    schOngoing: "FESTIVAL EN COURS AU PÔLE",
    schUpcoming: "Préparation Technique active",
    schRepresentedWilayas: "Wilayas Représentées",

    medTitle: "Tableau des Médailles National",
    medSubtitle: "Scoreboard des élites de la formation professionnelle",
    medPowerTitle: "Top 5 du Classement de Puissance Régionale",
    medSortTitle: "Trier le tableau par:",
    medCodeSort: "Code Wilaya",
    medGridHeader: "Grille de Médailles des 58 Wilayas d'Algérie",

    sylTitle: "Catalogue Officiel des Spécialités",
    sylSubtitle: "Syllabus technique officiel de plus de 50 disciplines",
    sylDescTitle: "Description Technique & Aperçu",
    sylStandardsTitle: "Standards d'Évaluation Internationaux",
    sylBlueprintTitle: "Plan de l'Épreuve Finale Nationale",
    sylBlueprintDesc: "Les finalistes algériens disposent de 18 heures réparties sur 3 ou 4 jours pour réaliser un livrable physique ou numérique conforme aux tolérances submillimétriques.",

    regTitle: "Portail de Validation Numérique",
    regSubtitle: "Système d'inscription WorldSkills Algérie 2026 (M.V.E.T. DZ)",
    regFormTitle: "SIMULATION D'INSCRIPTION ET VALIDATION",
    regFormDesc: "Remplissez ce formulaire pour simuler l'activation d'un compte de candidat aux Olympiades à travers les 58 Wilayas.",
    regFullName: "Nom Complet du Candidat (Français ou Arabe)",
    regDob: "Date de Naissance",
    regWilaya: "Wilaya Représentée",
    regInstitute: "Institut INSFP / Établissement de rattachement",
    regSelectedSkill: "Spécialité Technique Sélectionnée",
    regSubmitButton: "Valider le Profil et Imprimer le Pass d'Entrée",
    regPassHeaderAr: "الجمهورية الجزائرية الديمقراطية الشعبية",
    regPassHeaderEn: "Ministry of Vocational Training and Education",
    regPassEntryPass: "CARTE D'ACCÈS OFFICIEL",
    regPassCandidate: "Candidat Finaliste",
    regPassSpecialty: "Spécialité",
    regPassTrainNode: "Établissement",
    regPassSerial: "Numéro de Série",
    regPassStatus: "Statut d'Accès",
    regPassStatusValid: "STATUT VALIDÉ",
    regPassFooter: "90e membre de WorldSkills International",
    regPassIssued: "ÉMIS EN MAI 2026",
    regPassEnrollAnother: "Enregistrer un autre candidat",
    regPassSave: "Enregistrer le Pass Mobile",

    aiAdvisorTitle: "Conseiller Virtuel IA",
    aiAdvisorSub: "Conseil Ministériel Officiel • المرشد الرقمي",
    aiNoticeBanner: "Les critères techniques correspondent aux spécifications de WorldSkills International sous la tutelle du Ministère.",
    aiPlaceholder: "Posez votre question en arabe, français ou anglais...",
    aiQuickQueries: "Questions Fréquentes :",
    aiComposing: "Le conseiller IA formule sa réponse technique..."
  }
};
