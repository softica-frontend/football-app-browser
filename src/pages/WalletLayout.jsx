import { Outlet } from "react-router-dom";
import WalletHeader from "../components/Wallet/WalletHeader";

const WalletLayout = () => {
  return (
    <div className="px-[16px] pt-[20px] w-full flex flex-col items-center h-full">
      <WalletHeader />
      <Outlet />
    </div>
  );
};

export default WalletLayout;
