import { NavLink, useLocation } from "react-router-dom";

export default function NavItem({ children, to, title }) {
  const { pathname } = useLocation();

  const activeSection = pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`flex h-full justify-center text-white gap-[7px] items-center ${activeSection ? "bg-[rgba(255,255,255,0.35)] rounded-[48px] w-[139px]" : ""}`}
    >
      <p>{children}</p>
      {activeSection && <div>{title}</div>}
    </NavLink>
  );
}
