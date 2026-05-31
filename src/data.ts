import { CompetitionSector, SkillSpecialty, WilayaMedal, EventSchedule } from "./types";

export const STAGES_EXPLANATION = [
  {
    phase: 1,
    titleKnob: "Online Registration",
    titleAr: "التسجيل الرقمي",
    desc: "Trainees register through worldskills.mvet.dz. Profiles undergo direct digital validation by local institutions.",
    period: "January - March 2026",
    status: "Completed"
  },
  {
    phase: 2,
    titleKnob: "Wilayatal/Local",
    titleAr: "التصفيات الولائية",
    desc: "Intensive hands-on selection workshops inside technical training facilities across all 58 Wilayas.",
    period: "April 2026",
    status: "Completed"
  },
  {
    phase: 3,
    titleKnob: "Regional Hubs",
    titleAr: "المنافسة الإقليمية",
    desc: "Winners converge at designated regional hubs: Constantine, Ghardaïa, Algiers, Tlemcen, and Bechar.",
    period: "May - June 2026",
    status: "In Progress"
  },
  {
    phase: 4,
    titleKnob: "National Finals",
    titleAr: "النهائيات الوطنية",
    desc: "The elite qualifiers compete in the Grand Finals in Oran. Gold medalists compose Team Algeria for WorldStage entry.",
    period: "July 2026",
    status: "Upcoming"
  }
];

export const SKILL_SPECIALTIES: SkillSpecialty[] = [
  // ICT
  {
    name: "Mobile Applications Development",
    arabicName: "تطوير تطبيقات الهاتف",
    sector: CompetitionSector.ICT,
    details: "Developing robust mobile systems using React Native, Flutter, and server APIs, tested on UI/UX and runtime stability.",
    requirements: "TypeScript/Kotlin, API integrations, clean architectural design under extreme time limits.",
    participantsCount: 432
  },
  {
    name: "IT Software Solutions for Business",
    arabicName: "حلول البرمجيات للمؤسسات",
    sector: CompetitionSector.ICT,
    details: "Designing secure, modular database schemes and automated business logic tools.",
    requirements: "Database Normalization, C#/.NET or Java, robust error reporting systems.",
    participantsCount: 385
  },
  {
    name: "Cloud Computing & Web Technologies",
    arabicName: "الحوسبة السحابية وتقنيات الويب",
    sector: CompetitionSector.ICT,
    details: "Deploying high-availability systems on AWS/GCP and creating responsive full-stack interfaces.",
    requirements: "Docker containers, custom VPCs, secure frontend authentication models.",
    participantsCount: 512
  },
  // Manufacturing
  {
    name: "Automotive Technology",
    arabicName: "تكنولوجيا السيارات",
    sector: CompetitionSector.MANUFACTURING,
    details: "Diagnosing complex electrical faults, engine diagnostics, and mechanical overhaul alignment.",
    requirements: "Precision instrumentation reading, component troubleshooting, safety rig compliance.",
    participantsCount: 618
  },
  {
    name: "Industrial Mechanics & Welding",
    arabicName: "الميكانيك الصناعية واللحام",
    sector: CompetitionSector.MANUFACTURING,
    details: "High-accuracy welding patterns and pneumatic control loop setups for manufacturing machinery.",
    requirements: "TIG/MIG welding skills, engineering diagram translation, tolerance control.",
    participantsCount: 479
  },
  {
    name: "Mechatronics & Electronics",
    arabicName: "الميكاترونيكس والإلكترونيات",
    sector: CompetitionSector.MANUFACTURING,
    details: "Combining robotics, microcontrollers, and logic controllers to assemble dynamic production lines.",
    requirements: "PLC programming, pneumatic circuit wiring, physical system debugging.",
    participantsCount: 324
  },
  // Construction
  {
    name: "Drywall and Plastering Systems",
    arabicName: "أنظمة البناء الجاف والجبس",
    sector: CompetitionSector.CONSTRUCTION,
    details: "Creating aesthetic and structural partition walls, insulation matrices, and intricate plaster details.",
    requirements: "Symmetrical framing, exact acoustic layout, fine finish coating skills.",
    participantsCount: 298
  },
  {
    name: "Electrical Installations",
    arabicName: "التمديدات الكهربائية",
    sector: CompetitionSector.CONSTRUCTION,
    details: "Wiring complex commercial or residential automation grids according to strict international codes.",
    requirements: "Precision line bending, smart relay controllers, insulation safety checks.",
    participantsCount: 541
  },
  {
    name: "Refrigeration and Air Conditioning",
    arabicName: "التبريد وتكييف الهواء",
    sector: CompetitionSector.CONSTRUCTION,
    details: "Building heat-exchange pumps and pressurized coolant networks safely and efficiently.",
    requirements: "Copper brazing, electrical layout wiring, eco-friendly refrigerant recovery.",
    participantsCount: 388
  },
  // Creative
  {
    name: "Fashion Technology & Dressmaking",
    arabicName: "تصميم الأزياء والخياطة",
    sector: CompetitionSector.CREATIVE,
    details: "Proposing fashion designs, drafting patterns, draping on mannequins, and stitching full outfits.",
    requirements: "Accurate industrial machine stitchwork, fabric optimization, luxury embellishment.",
    participantsCount: 412
  },
  {
    name: "Graphic Design Technology",
    arabicName: "تكنولوجيا التصميم الغرافيكي",
    sector: CompetitionSector.CREATIVE,
    details: "Generating compelling branding campaigns, vector layouts, packaging templates, and core typography.",
    requirements: "Vector artwork, pre-press standards, professional brand manual drafting.",
    participantsCount: 456
  },
  // Social
  {
    name: "Hairdressing & Beauty Therapy",
    arabicName: "الحلاقة والتجميل",
    sector: CompetitionSector.SERVICES,
    details: "High-fashion hair sculpture, precision coloring, and advanced therapeutic skincare sessions.",
    requirements: "Chemical safe mixing, modern aesthetic hair styling, hygiene standards.",
    participantsCount: 315
  },
  {
    name: "Restaurant Service & Hotel Reception",
    arabicName: "الخدمات الفندقية والمطاعم",
    sector: CompetitionSector.SERVICES,
    details: "Running hospitality check-ins on database software and executing formal fine-dining services.",
    requirements: "Multilingual etiquette, culinary carving, concierge resolution simulations.",
    participantsCount: 276
  },
  // Culinary
  {
    name: "Cooking & Gastronomy",
    arabicName: "الطبخ وعلم الطهي",
    sector: CompetitionSector.CULINARY,
    details: "Crafting fine multi-course menus based on modern gastromonic concepts, plating, and waste reduction.",
    requirements: "Exact portioning, flavor balancing, sterile knife skills under extreme stress.",
    participantsCount: 492
  },
  {
    name: "Pâtisserie and Confectionery",
    arabicName: "صناعة الحلويات",
    sector: CompetitionSector.CULINARY,
    details: "Tempering rich chocolate sculptures, presenting fragile pastries, and baking signature desserts.",
    requirements: "Sugar art manipulation, perfect temperature controls, artistic presentation.",
    participantsCount: 359
  }
];

// Curated 58 Algerian Wilayas list with realistic initial medal counts based on performance
export const WILAYAS_DATA: WilayaMedal[] = [
  { code: 16, name: "Algiers", arabicName: "الجزائر", gold: 5, silver: 4, bronze: 6, total: 15, featuredSkill: "Mobile Applications" },
  { code: 31, name: "Oran", arabicName: "وهران", gold: 4, silver: 5, bronze: 3, total: 12, featuredSkill: "Automotive Technology" },
  { code: 25, name: "Constantine", arabicName: "قسنطينة", gold: 3, silver: 3, bronze: 5, total: 11, featuredSkill: "Mechatronics" },
  { code: 13, name: "Tlemcen", arabicName: "تلمسان", gold: 3, silver: 2, bronze: 4, total: 9, featuredSkill: "Web Technologies" },
  { code: 19, name: "Sétif", arabicName: "سطيف", gold: 2, silver: 4, bronze: 3, total: 9, featuredSkill: "Drywall & Plastering" },
  { code: 8, name: "Béchar", arabicName: "بشار", gold: 2, silver: 2, bronze: 3, total: 7, featuredSkill: "Electrical Installations" },
  { code: 47, name: "Ghardaïa", arabicName: "غرداية", gold: 2, silver: 2, bronze: 2, total: 6, featuredSkill: "Graphic Design" },
  { code: 30, name: "Ouargla", arabicName: "ورقلة", gold: 2, silver: 1, bronze: 2, total: 5, featuredSkill: "Industrial Mechanics" },
  { code: 6, name: "Béjaïa", arabicName: "بجاية", gold: 1, silver: 3, bronze: 2, total: 6, featuredSkill: "Pâtisserie Art" },
  { code: 15, name: "Tizi Ouzou", arabicName: "تيزي وزو", gold: 1, silver: 2, bronze: 3, total: 6, featuredSkill: "Fashion Technology" },
  { code: 2, name: "Chlef", arabicName: "الشلف", gold: 1, silver: 2, bronze: 1, total: 4, featuredSkill: "Refrigeration Systems" },
  { code: 5, name: "Batna", arabicName: "باتنة", gold: 1, silver: 1, bronze: 3, total: 5, featuredSkill: "Cooking & Gastronomy" },
  { code: 22, name: "Sidi Bel Abbès", arabicName: "سيدي بلعباس", gold: 1, silver: 1, bronze: 2, total: 4, featuredSkill: "IT Software Solutions" },
  { code: 23, name: "Annaba", arabicName: "عنابة", gold: 1, silver: 1, bronze: 2, total: 4, featuredSkill: "Cloud Computing" },
  { code: 18, name: "Jijel", arabicName: "جيجل", gold: 1, silver: 0, bronze: 2, total: 3, featuredSkill: "Cooking & Gastronomy" },
  { code: 21, name: "Skikda", arabicName: "سكيكدة", gold: 1, silver: 0, bronze: 1, total: 2, featuredSkill: "Welding Technology" },
  { code: 39, name: "El Oued", arabicName: "الوادي", gold: 0, silver: 2, bronze: 2, total: 4, featuredSkill: "Electrical Installations" },
  { code: 17, name: "Djelfa", arabicName: "الجلفة", gold: 0, silver: 2, bronze: 1, total: 3, featuredSkill: "Drywall & Plastering" },
  { code: 14, name: "Tiaret", arabicName: "تيارت", gold: 0, silver: 1, bronze: 2, total: 3, featuredSkill: "Automotive Technology" },
  { code: 7, name: "Biskra", arabicName: "بسكرة", gold: 0, silver: 1, bronze: 2, total: 3, featuredSkill: "Refrigeration Systems" },
  { code: 10, name: "Bouira", arabicName: "البويرة", gold: 0, silver: 1, bronze: 1, total: 2, featuredSkill: "Dressmaking" },
  { code: 27, name: "Mostaganem", arabicName: "مستغانم", gold: 0, silver: 1, bronze: 1, total: 2, featuredSkill: "Restaurant Service" },
  { code: 24, name: "Guelma", arabicName: "قالمة", gold: 0, silver: 1, bronze: 0, total: 1, featuredSkill: "Electronics" },
  { code: 3, name: "Laghouat", arabicName: "الأغواط", gold: 0, silver: 0, bronze: 2, total: 2, featuredSkill: "IT Solutions" },
  { code: 29, name: "Mascara", arabicName: "معسكر", gold: 0, silver: 0, bronze: 2, total: 2, featuredSkill: "Plastering" },
  { code: 4, name: "Oum El Bouaghi", arabicName: "أم البواقي", gold: 0, silver: 0, bronze: 1, total: 1, featuredSkill: "Hairdressing" },
  { code: 9, name: "Blida", arabicName: "البليدة", gold: 0, silver: 0, bronze: 1, total: 1, featuredSkill: "Pâtisserie" },
  { code: 11, name: "Tamanrasset", arabicName: "تمنراست", gold: 0, silver: 0, bronze: 1, total: 1, featuredSkill: "Jewelry / Handcraft" }
];

// Helper to fill other Wilayas up to 58 dynamically so they exist and are search-compatible
export function getAll58Wilayas(): WilayaMedal[] {
  const generated: WilayaMedal[] = [...WILAYAS_DATA];
  const existingCodes = new Set(generated.map(w => w.code));
  
  const allWilayasNames: { [code: number]: { name: string, ar: string } } = {
    1: { name: "Adrar", ar: "أدرار" },
    2: { name: "Chlef", ar: "الشلف" },
    3: { name: "Laghouat", ar: "الأغواط" },
    4: { name: "Oum El Bouaghi", ar: "أم البواقي" },
    5: { name: "Batna", ar: "باتنة" },
    6: { name: "Béjaïa", ar: "بجاية" },
    7: { name: "Biskra", ar: "بسكرة" },
    8: { name: "Béchar", ar: "بشار" },
    9: { name: "Blida", ar: "البليدة" },
    10: { name: "Bouira", ar: "البويرة" },
    11: { name: "Tamanrasset", ar: "تمنراست" },
    12: { name: "Tébessa", ar: "تبسة" },
    13: { name: "Tlemcen", ar: "تلمسان" },
    14: { name: "Tiaret", ar: "تيارت" },
    15: { name: "Tizi Ouzou", ar: "تيزي وزو" },
    16: { name: "Algiers", ar: "الجزائر" },
    17: { name: "Djelfa", ar: "الجلفة" },
    18: { name: "Jijel", ar: "جيجل" },
    19: { name: "Sétif", ar: "سطيف" },
    20: { name: "Saïda", ar: "سعيدة" },
    21: { name: "Skikda", ar: "سكيكدة" },
    22: { name: "Sidi Bel Abbès", ar: "سيدي بلعباس" },
    23: { name: "Annaba", ar: "عنابة" },
    24: { name: "Guelma", ar: "قالمة" },
    25: { name: "Constantine", ar: "قسنطينة" },
    26: { name: "Médéa", ar: "المدية" },
    27: { name: "Mostaganem", ar: "مستغانم" },
    28: { name: "M'Sila", ar: "المسيلة" },
    29: { name: "Mascara", ar: "معسكر" },
    30: { name: "Ouargla", ar: "ورقلة" },
    31: { name: "Oran", ar: "وهران" },
    32: { name: "El Bayadh", ar: "البيض" },
    33: { name: "Illizi", ar: "إيليزي" },
    34: { name: "Bordj Bou Arréridj", ar: "برج بوعريريج" },
    35: { name: "Boumerdès", ar: "بومرداس" },
    36: { name: "El Tarf", ar: "الطارف" },
    37: { name: "Tindouf", ar: "تندوف" },
    38: { name: "Tissemsilt", ar: "تيسمسيلت" },
    39: { name: "El Oued", ar: "الوادي" },
    40: { name: "Khenchela", ar: "خنشلة" },
    41: { name: "Souk Ahras", ar: "سوق أهراس" },
    42: { name: "Tipaza", ar: "تيبازة" },
    43: { name: "Mila", ar: "ميلة" },
    44: { name: "Aïn Defla", ar: "عين الدفلى" },
    45: { name: "Naâma", ar: "نعامة" },
    46: { name: "Aïn Témouchent", ar: "عين تموشنت" },
    47: { name: "Ghardaïa", ar: "غرداية" },
    48: { name: "Relizane", ar: "غليزان" },
    49: { name: "El M'Ghair", ar: "المغير" },
    50: { name: "El Meniaa", ar: "المنيعة" },
    51: { name: "Ouled Djellal", ar: "أولاد جلال" },
    52: { name: "Bordj Baji Mokhtar", ar: "برج باجي مختار" },
    53: { name: "Béni Abbès", ar: "بني عباس" },
    54: { name: "Timimoun", ar: "تيميمون" },
    55: { name: "Touggourt", ar: "تقرت" },
    56: { name: "Djanet", ar: "جانت" },
    57: { name: "In Salah", ar: "عين صالح" },
    58: { name: "In Guezzam", ar: "عين قزام" }
  };

  for (let i = 1; i <= 58; i++) {
    if (!existingCodes.has(i)) {
      const data = allWilayasNames[i] || { name: `Wilaya ${i}`, ar: `ولاية ${i}` };
      generated.push({
        code: i,
        name: data.name,
        arabicName: data.ar,
        gold: 0,
        silver: 0,
        bronze: 0,
        total: 0,
        featuredSkill: "Technical Core"
      });
    }
  }

  // Sort by gold medals desc, then total desc, then code asc
  return generated.sort((a, b) => {
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.total !== a.total) return b.total - a.total;
    return a.code - b.code;
  });
}

export const EVENT_SCHEDULES: EventSchedule[] = [
  {
    id: "sch-1",
    skill: "Mobile Applications Development",
    arabicSkill: "تطوير تطبيقات الهاتف",
    sector: CompetitionSector.ICT,
    stage: "Regional",
    venue: "Constantine Tech Hub (Centre de Formation Constantine 1)",
    dateRange: "May 25 - May 30, 2026",
    status: "Completed",
    wilayasCompeting: ["Constantine", "Algiers", "Sétif", "Batna", "Skikda"]
  },
  {
    id: "sch-2",
    skill: "Mechatronics & Electronics",
    arabicSkill: "الميكاترونيكس والإلكترونيات",
    sector: CompetitionSector.MANUFACTURING,
    stage: "Regional",
    venue: "Ghardaïa Industrial Institute (Complex Ghardaïa 2)",
    dateRange: "May 28 - June 3, 2026",
    status: "In Progress",
    wilayasCompeting: ["Ghardaïa", "Bechar", "Ouargla", "El Oued", "Adrar"]
  },
  {
    id: "sch-3",
    skill: "Cloud Computing & Web Technologies",
    arabicSkill: "الحوسبة السحابية وتقنيات الويب",
    sector: CompetitionSector.ICT,
    stage: "Regional",
    venue: "Algiers Innovation Hub (Centre d'excellence Ben Aknoun)",
    dateRange: "June 2 - June 6, 2026",
    status: "Upcoming",
    wilayasCompeting: ["Algiers", "Blida", "Boumerdès", "Tipaza", "Tizi Ouzou"]
  },
  {
    id: "sch-4",
    skill: "Automotive Technology",
    arabicSkill: "تكنولوجيا السيارات",
    sector: CompetitionSector.MANUFACTURING,
    stage: "Regional",
    venue: "Tlemcen Mechanical Center (Institut INSFP Tlemcen)",
    dateRange: "May 27 - June 2, 2026",
    status: "In Progress",
    wilayasCompeting: ["Tlemcen", "Oran", "Sidi Bel Abbès", "Mascara", "Chlef"]
  },
  {
    id: "sch-5",
    skill: "Drywall and Plastering Systems",
    arabicSkill: "أنظمة البناء الجاف والجبس",
    sector: CompetitionSector.CONSTRUCTION,
    stage: "Regional",
    venue: "Béchar Civil Engineering Workshop (INSFP Béchar)",
    dateRange: "June 5 - June 10, 2026",
    status: "Upcoming",
    wilayasCompeting: ["Béchar", "Tindouf", "Adrar", "Béni Abbès", "Naâma"]
  },
  {
    id: "sch-6",
    skill: "Cooking & Gastronomy",
    arabicSkill: "الطبخ وعلم الطهي",
    sector: CompetitionSector.CULINARY,
    stage: "National Finals",
    venue: "Oran Luxury Hospitality Center (INSFP Cité Djamel Oran)",
    dateRange: "July 12 - July 18, 2026",
    status: "Upcoming",
    wilayasCompeting: ["All Wilayas / Phase 3 Golden Finalists"]
  },
  {
    id: "sch-7",
    skill: "Graphic Design Technology",
    arabicSkill: "تكنولوجيا التصميم الغرافيكي",
    sector: CompetitionSector.CREATIVE,
    stage: "National Finals",
    venue: "Oran Convention Palace (Centre des Conventions d'Oran - CCO)",
    dateRange: "July 14 - July 19, 2026",
    status: "Upcoming",
    wilayasCompeting: ["All Wilayas / Phase 3 Golden Finalists"]
  }
];
