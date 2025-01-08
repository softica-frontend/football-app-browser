import { BonucIcon, HomeIcon, StoreIcon, WalletIcon } from "../UI/icons";
import NavItem from "./Nav-Item";

export default function Navigation() {
  return (
    <nav className="w-screen h-[79px] flex items-center justify-center w-[298px] pb-[29px] gap-[16px] px-[3px] select-none">
      <NavItem to="/menu/home" title="Inicio">
        <HomeIcon />
      </NavItem>
      <NavItem to="/menu/store" title="Tienda">
        <StoreIcon />
      </NavItem>
      <NavItem to="/menu/wallet" title="Cartera">
        <WalletIcon />
      </NavItem>
      <NavItem to="/menu/bonus" title="Bono">
        <BonucIcon />
      </NavItem>
    </nav>
  );
}
