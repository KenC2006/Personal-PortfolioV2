import { NavLink, ContactLink } from "@/types";

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
];

export const contactLinks: ContactLink[] = [
  {
    href: "https://github.com/KenC2006",
    label: "GitHub",
    icon: "github",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "https://www.linkedin.com/in/ken-chen2006",
    label: "LinkedIn",
    icon: "linkedin",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "mailto:ken.chen8176@gmail.com",
    label: "Email",
    icon: "mail",
  },
  {
    href: "/res/KenChen_Resume.pdf",
    label: "Resume",
    icon: "download",
    target: "_blank",
  },
];

export const personalInfo = {
  name: "Ken Chen",
  title: "I'm a",
  description:
    "and student studying Computer Engineering at the University of Toronto with an interest in techology. When I'm not messing with some random project, you can probably catch me gaming, scrolling reels, or playing basketball.",
  location: "Toronto, Canada",
  profileImage: "/res/profilePic.JPG",
};
