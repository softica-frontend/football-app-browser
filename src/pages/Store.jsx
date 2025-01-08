import { NavLink, Outlet } from "react-router-dom";

export default function StoreLayout() {
  return (
    <section className="w-full h-full">
      <nav className="flex w-full mt-4 gap-[28px] px-[32px]">
        <NavLink
          to="/menu/store/players"
          className={({ isActive }) =>
            `${isActive ? "bg-white text-[#37C100] py-[6px]" : "border-2 border-white/40 text-white/40 py-[4px]"} w-1/2 text-center rounded-[28px]`
          }
        >
          Tienda Player
        </NavLink>
        <NavLink
          to="/menu/store/balls"
          className={({ isActive }) =>
            `${isActive ? "bg-white text-[#37C100] py-[6px]" : "border-2 border-white/40 text-white/40 py-[4px]"} w-1/2 text-center rounded-[28px]`
          }
        >
          Tienda de bolas
        </NavLink>
      </nav>
      <div
        className="px-4 pt-[10px] pb-[20px]"
        style={{ height: "calc(100% - 52px)" }}
      >
        <Outlet />
      </div>
    </section>
  );
}
