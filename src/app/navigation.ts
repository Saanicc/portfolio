import { Info, BriefcaseBusiness, Mail, Code, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavItemType = {
  path: string;
  name: string;
  order: number;
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const navigation: NavItemType[] = [
  {
    name: "About",
    path: "/about",
    order: 1,
    title: "About",
    icon: Info,
  },
  {
    name: "Work",
    path: "/work",
    order: 2,
    title: "Work",
    icon: BriefcaseBusiness,
  },
  {
    name: "Projects",
    path: "/projects",
    order: 3,
    title: "Projects",
    icon: Code,
  },
  {
    name: "Contact",
    path: "/contact",
    order: 4,
    title: "Contact",
    icon: Mail,
  },
];

export default navigation;
