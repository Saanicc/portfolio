export type NavItemType = {
  path: string;
  name: string;
  order: number;
  title: string;
};

export const navigation: NavItemType[] = [
  {
    name: "About",
    path: "/about",
    order: 1,
    title: "About",
  },
  {
    name: "Work",
    path: "/work",
    order: 2,
    title: "Work",
  },
  {
    name: "Projects",
    path: "/projects",
    order: 3,
    title: "Projects",
  },
  {
    name: "Contact",
    path: "/contact",
    order: 4,
    title: "Contact",
  },
];

export default navigation;
