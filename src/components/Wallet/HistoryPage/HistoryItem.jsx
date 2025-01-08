import { WalletItemBg } from "../../UI/icons";

const HistoryItem = ({ data }) => {
  return (
    <div className="h-[63px] w-full relative">
      <div className="absolute inset-0">
        <WalletItemBg />
      </div>
      <div className="h-full w-full inset-0 absolute py-[30px] px-[38px] flex justify-between items-center">
        <div>
          <p className="text-[20px]">{data.name}</p>
        </div>
        <p className="text-[20px] text-[#C20000]">-100 USD</p>
      </div>
    </div>
  );
};

export default HistoryItem;
