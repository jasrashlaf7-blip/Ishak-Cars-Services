export enum CompetitionSector {
  ICT = "Information & Communication",
  MANUFACTURING = "Manufacturing & Engineering",
  CONSTRUCTION = "Construction & Building",
  CREATIVE = "Creative Arts & Fashion",
  SERVICES = "Social & Personal Services",
  CULINARY = "Hospitality & Culinary Arts"
}

export interface SkillSpecialty {
  name: string;
  arabicName: string;
  sector: CompetitionSector;
  details: string;
  requirements: string;
  participantsCount: number; // validated trainees in this discipline
}

export interface WilayaMedal {
  code: number;
  name: string;
  arabicName: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  featuredSkill?: string;
}

export interface EventSchedule {
  id: string;
  skill: string;
  arabicSkill: string;
  sector: CompetitionSector;
  stage: "Local" | "Regional" | "National Finals";
  venue: string;
  dateRange: string;
  status: "Completed" | "In Progress" | "Upcoming";
  wilayasCompeting: string[];
}

export interface TraineeProfile {
  fullName: string;
  birthDate: string;
  wilayaCode: number;
  institution: string;
  specialization: string;
  validationStatus: "Validated" | "Under Review" | "Action Required";
  avatarUrl?: string;
}

export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
