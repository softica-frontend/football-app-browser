import { NavLink, Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
      id="main-wrapper"
    >
      <main className="w-full max-w-[375px] max-phone:max-w-[100vw] max-h-[800px] max-phone:max-h-[100dvh] h-full rounded-t-[40px] flex flex-col items-center text-xl">
        <div className="flex flex-col items-center w-full px-4 h-full pt-10 gap-20">
          <nav className="flex w-full mt-4 gap-[10px]">
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `${isActive ? "bg-white text-[#37C100] py-[6px]" : "border-2 border-white/40 text-white/40 py-[4px]"} w-1/2 text-center rounded-[28px]`
              }
            >
              Inicio de sesión
            </NavLink>
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                `${isActive ? "bg-white text-[#37C100] py-[6px]" : "border-2 border-white/40 text-white/40 py-[4px]"} w-1/2 text-center rounded-[28px]`
              }
            >
              Regístrese en
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
