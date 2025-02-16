import { navigation } from "@/pages/navigation";
import Link from "next/link";
const Nav = () => {
  return (
    <nav className="flex justify-end gap-10 m-10">
      {navigation.map((item) => (
        <Link key={item.name} href={item.path} className="text-white">
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
