import type { Project, Skill } from "./types";

export const roles = [
  "Software Developer",
  "React Developer",
  "Frontend Engineer",
  "Problem Solver",
];

export const skills: Skill[] = [
  { name: "React.js", level: 92 },
  { name: "JavaScript (ES6+)", level: 90 },
  { name: "HTML5/CSS3", level: 93 },
  { name: "Tailwind CSS", level: 88 },
  { name: "Node.js (Basics)", level: 72 },
  { name: "UAT & Functional Validation", level: 86 },
];

export const projects: Project[] = [
  {
    title: "NovaCart Ecommerce Application",
    summary:
      "Built a full ecommerce app with product search, filtering, sorting, cart persistence, and checkout flows.",
    stack: ["React", "Tailwind CSS", "React Router", "Express API", "Vite"],
    impact:
      "Implemented frontend and backend integration with pluggable catalog providers for scalable product data.",
    link: "#",
    screenshot: "/projects/ecommerce-react.svg",
    liveLink: "https://ecommerce-react-eight-xi.vercel.app",
  },
  {
    title: "YouTube Clone Application",
    summary:
      "Developed a responsive video streaming app using React.js with reusable components and efficient state handling.",
    stack: ["React.js", "YouTube Data API", "JavaScript", "CSS3"],
    impact: "Integrated real-time video content, search, and listing flows similar to YouTube UI.",
    link: "#",
    screenshot: "/projects/youtube-clone.svg",
    liveLink: "https://youtube-clone-six-teal.vercel.app/",
  },
  {
    title: "Portfolio Website",
    summary:
      "Designed and built a personal portfolio website focused on clean UI and smooth scrolling user experience.",
    stack: ["React.js", "React Scroll", "EmailJS"],
    impact: "Implemented contact form without backend and responsive design across devices.",
    link: "#",
    screenshot: "/projects/portfolio-site.svg",
    liveLink: "https://my-new-portfolio-virid.vercel.app/",
  },
];

export const experiencePoints = [
  "Quality Management Audit at Hema's Enterprises Private Limited (Cavinkare) (2024 - Present).",
  "Act as a functional bridge between Quality and IT teams for internal automation portals.",
  "Gather business requirements and translate them into functional specs for developers.",
  "Participate in UAT and validate workflow logic, approval hierarchies, and role-based access.",
  "Report bugs and workflow mismatches, and support improvements using MIS and data analysis.",
];

export const education = [
  "B.E. Computer Science and Engineering, IFET College of Engineering (2019 - 2023), CGPA: 7.55",
  "HSC, Rajshree Sugars Ramakrishna Vid. Mat. Hr. Sec School (2018 - 2019), Percentage: 60.3",
];

export const contact = {
  name: "Elamparithi",
  email: "parithithulasi@gmail.com",
  phone: "+91 7397436432",
  linkedin: "https://www.linkedin.com/in/elamparithi06",
};

export const resume = {
  file: "/Elamparithi_Resume.pdf",
};

export const aboutSummary =
  "Software Developer with strong interest in scalable web development and real-world problem solving. I combine frontend implementation skills with requirement understanding, workflow validation, and QA collaboration to ship reliable solutions.";

export const highlights = [
  "Functional bridge between QA and IT teams",
  "Hands-on UAT and workflow validation",
  "Built React projects with API integrations",
];
