import { WalletDollarIcon, WalletItemBg } from "../../UI/icons";

const WalletListItem = ({ data }) => {
  return (
    <div className="h-[63px] w-full relative wallet-item opacity-0 translate-y-[20px]">
      <div className="absolute inset-0">
        <WalletItemBg />
      </div>
      <div className="h-full w-full inset-0 absolute py-[12px] px-[38px] flex justify-between items-center">
        <div className="h-[39px] w-[39px] relative">
          <img
            src={`https://fotball-learn.site/photo/${data.photo}`}
            alt="Test"
            className="w-full h-full rounded-[50%] object-cover"
          />
        </div>
        <div className="flex flex-col items-center max-w-[70%]">
          <p className="text-[18px]">{data.nameSurname}</p>
          <p className="text-[11px]">{data.amount.toFixed(2)}. USD</p>
        </div>
        <WalletDollarIcon />
      </div>
    </div>
  );
};

export default WalletListItem;
