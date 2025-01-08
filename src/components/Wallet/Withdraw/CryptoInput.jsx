import { useEffect, useState } from "react";
import { SelectIcon } from "../../UI/icons";

const CryptoInput = () => {
  const [isOpen, setIsOpen] = useState();
  const [active, setActive] = useState("TRC 20");

  useEffect(() => {
    setIsOpen(false);
  }, [active]);

  return (
    <div
      className={`bg-[#FFFFFF66] w-full rounded-[28px]  mb-4 text-[20px] flex`}
    >
      <input
        required
        type="text"
        // value={usdInput}
        // onChange={(e) => setUsdInput(parseFloat(e.target.value))}
        className="rounded-[28px] py-[18px] max-xsmall:py-[14px] pl-[20px] w-full"
        placeholder="Enter your crypto adress"
      />
      <div className="bg-white rounded-[28px] text-[#37C100] flex items-center justify-center px-10 min-w-[130px]  w-[130px] relative">
        {isOpen && (
          <div className="absolute top-1/2 h-[200px] pt-[40px] bg-white w-full rounded-b-[28px] z-0 flex flex-col items-start px-[14px]">
            <div
              className="py-2 flex items-center gap-2"
              onClick={() => setActive("TRC 20")}
            >
              TRC 20 {active == "TRC 20" && <SelectIcon />}
            </div>
            <div
              className="py-2 flex items-center gap-2"
              onClick={() => setActive("BEP 20")}
            >
              BEP 20 {active == "BEP 20" && <SelectIcon />}
            </div>
            <div
              className="py-2 flex items-center gap-2"
              onClick={() => setActive("BTC")}
            >
              BTC {active == "BTC" && <SelectIcon />}
            </div>
          </div>
        )}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-full h-full shadow-[0px_3px_5.4px_rgba(0,0,0,0.08)] flex items-center justify-center z-2 bg-white rounded-[28px]"
        >
          {active}
        </div>
      </div>
    </div>
  );
};

export default CryptoInput;
