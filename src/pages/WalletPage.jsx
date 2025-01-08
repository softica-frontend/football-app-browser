import WalletCard from "../components/Wallet/MainPage/WalletCard";
import WalletList from "../components/Wallet/MainPage/WalletList";

export default function WalletPage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <WalletCard />
      <WalletList />
    </div>
  );
}
