import CryptoSelectHeader from "../components/Wallet/CryptoSelect/CryptoSelectHeader";
import FirstSection from "../components/Wallet/CryptoSelect/FirstSection";

const CryptoSelect = () => {
  return (
    <div className="w-full h-full pt-[40px]">
      <CryptoSelectHeader />
      <FirstSection />
    </div>
  );
};

export default CryptoSelect;
