import BonusHeader from "../components/Bonus/BonusHeader";
import DailyBonus from "../components/Bonus/DailyBonus";
import PromoBonus from "../components/Bonus/PromoBonus";

export default function BonusPage() {
  return (
    <div className="w-full h-full px-[18px] pt-[16px]">
      <BonusHeader />
      <DailyBonus />
      <PromoBonus />
      {/* <InviteButton /> */}
    </div>
  );
}
