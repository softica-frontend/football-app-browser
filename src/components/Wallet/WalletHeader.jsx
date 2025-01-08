import { Link, useLocation } from "react-router-dom";
import { ArrowBackIcon } from "../UI/icons";

const WalletHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="w-full flex justify-between text-[14px]">
      {pathname == "/menu/wallet" && <div>Wallet</div>}
      {(pathname == "/menu/wallet/history" ||
        pathname == "/menu/wallet/country-select") && (
        <Link className="flex items-center gap-3" to="/menu/wallet">
          <ArrowBackIcon />
          <div className="text-[#E7FF2B] underline underline-offset-2">
            Volver
          </div>
        </Link>
      )}
      {pathname == "/menu/wallet/crypto-select" && (
        <Link
          className="flex items-center gap-3"
          to="/menu/wallet/country-select"
        >
          <ArrowBackIcon />
          <div className="text-[#E7FF2B] underline underline-offset-2">
            Volver
          </div>
        </Link>
      )}
      {pathname == "/menu/wallet/withdraw" && (
        <Link
          className="flex items-center gap-3"
          to="/menu/wallet/crypto-select"
        >
          <ArrowBackIcon />
          <div className="text-[#E7FF2B] underline underline-offset-2">
            Back
          </div>
        </Link>
      )}
      <a
        className="text-[#E7FF2B] underline underline-offset-2"
        href="https://t.me/futbolgame_support"
        target="_blanc"
      >
        Soporte
      </a>
    </header>
  );
};

export default WalletHeader;
