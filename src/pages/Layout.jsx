import { Navigate, Outlet } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import { useSelector } from "react-redux";

export default function Layout() {
  const user = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/loading" />;
  }
  /* Rectangle 6329 */

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="w-[375px] max-phone:w-[100vw] h-[100dvh] max-h-[844px] flex flex-col items-center justify-between"
        id="main-wrapper"
      >
        <main className="w-full h-full mt-[5px] rounded-t-[40px] flex flex-col items-center">
          <div
            style={{ height: "calc(100% - 79px)" }}
            className="flex flex-col items-center w-full"
          >
            <Outlet />
          </div>

          <Navigation />
        </main>
      </div>
    </div>
  );
}
