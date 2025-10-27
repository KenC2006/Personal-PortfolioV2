export interface Project {
  id: string;
  title: string;
  timeframe: string;
  tech: string[];
  preview: string;
  details: string[];
  image: string;
  gifImage?: string;
  github?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  companyName: string;
  timeframe: string;
  preview: string;
  details: string[];
  logoPath: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ContactLink {
  href: string;
  label: string;
  icon: string;
  target?: string;
  rel?: string;
}

export interface ModalData {
  type: "project" | "experience";
  data: Project | Experience;
}
