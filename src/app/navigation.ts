export type NavItemType = {
  path: string;
  name: string;
  order: number;
  title: string;
};

export const navigation: NavItemType[] = [
  {
    name: "Projects",
    path: "/projects",
    order: 1,
    title: "Projects",
  },
  {
    name: "Skills",
    path: "/skills",
    order: 2,
    title: "Skills",
  },
  {
    name: "About",
    path: "/about",
    order: 3,
    title: "About",
  },
  {
    name: "Contact",
    path: "/contact",
    order: 4,
    title: "Contact",
  },
];

export default navigation;
