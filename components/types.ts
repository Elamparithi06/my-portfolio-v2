export type Theme = "light" | "dark";
export type DesignMode = "neon" | "sunset" | "mono";
export type LayoutMode = "creative" | "split" | "editorial" | "minimal";

export type Skill = {
  name: string;
  level: number;
};

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  impact: string;
  link: string;
  screenshot: string;
  liveLink?: string;
};
