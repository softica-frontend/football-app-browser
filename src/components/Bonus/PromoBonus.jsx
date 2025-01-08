import Channel from "./Channel";
import Promocode from "./Promocode";

const PromoBonus = () => {
  return (
    <div className="mt-[30px] w-full grid grid-cols-2 gap-[18px] text-center max-xsmall:mt-[20px]">
      <Promocode />
      <Channel />
    </div>
  );
};

export default PromoBonus;
