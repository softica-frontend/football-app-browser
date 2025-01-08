import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrency } from "../../../util/back/requests";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../UI/Modal";
import SelectedText from "./SelectedText";
import StartedText from "./StartedText";
import CryptoInput from "./CryptoInput";

const UsdInput = () => {
  const balance = useSelector((state) => state.auth.balance);
  const [usdInput, setUsdInput] = useState("");
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState();
  const [currencyInput, setCurrencyInput] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [action, setAction] = useState(
    type == "crypto" ? "SELECTED" : "STARTED",
  );

  const storageCurrency = localStorage.getItem("country")
    ? localStorage.getItem("country")
    : "ARS";
  const activeCurrency = list?.find((el) => el.country == storageCurrency);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (usdInput >= 25 && usdInput <= balance) {
      setModalIsOpen(true);
    } else {
      setValidation(true);
    }
  };
  useEffect(() => {
    if (usdInput) {
      setCurrencyInput((usdInput * activeCurrency?.value).toFixed(3));
    }
    setValidation(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdInput]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrency();
        setList(response);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return (
      <div className="text-center mt-20 flex flex-col gap-10 items-center">
        Algo ha ido mal. Vuelva a intentarlo más tarde.
        <Link
          to="/menu/home"
          className="bg-[#E7FF2B] text-[#37C100] rounded-[28px] w-max px-6 py-2"
        >
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {action == "STARTED" && (
          <StartedText
            onCancel={() => setModalIsOpen(false)}
            onOk={() => setAction("SELECTED")}
          />
        )}
        {action == "SELECTED" && (
          <SelectedText
            onClickOk={() => {
              localStorage.setItem("priceAmount", 7);
              navigate(
                `/menu/wallet/withdraw-second?currency=${activeCurrency.value}&country=${activeCurrency.country}&type=first`,
              );
            }}
            // onClickCancel={() => setModalIsOpen(false)}
            activeCurrency={activeCurrency}
          />
        )}
        {/* {action == "SUCCESS" && <SuccessfulText />} */}
      </Modal>
      <form className="w-full flex flex-col" onSubmit={submitHandler}>
        {type == "crypto" && <CryptoInput />}
        <div
          className={`bg-[#FFFFFF66] w-full rounded-[28px] text-[20px] flex ${validation ? "outline outile-2 outline-red-600" : ""}`}
        >
          <input
            required
            type="number"
            max={balance}
            min={25}
            step="0.001"
            value={usdInput}
            onChange={(e) => setUsdInput(parseFloat(e.target.value))}
            className="rounded-[28px] py-[18px] max-xsmall:py-[14px] pl-[20px] w-full"
            placeholder="Introduzca un importe"
          />
          <div
            className="bg-white rounded-[28px] text-[#37C100] flex items-center justify-center px-10 w-[130px] min-w-[130px]"
            onClick={() => {
              setUsdInput(balance ? parseFloat(balance).toFixed(3) : 0);
            }}
          >
            MAX
          </div>
        </div>
        <p className="text-[14px] pl-[30px] py-2">
          Sus Banas {balance ? balance.toFixed(3) : "00.00"} USD
        </p>
        <div className="w-full grid grid-cols-3 gap-2 text-[20px]">
          <div
            className="border-[3px] border-white rounded-[28px] py-[16px] max-xsmall:py-[8px] text-center"
            onClick={() =>
              setUsdInput(
                balance
                  ? parseFloat((balance.toFixed(3) * 0.25).toFixed(3))
                  : 0,
              )
            }
          >
            25%
          </div>
          <div
            className="border-[3px] border-white rounded-[28px] py-[16px] max-xsmall:py-[8px] text-center"
            onClick={() =>
              setUsdInput(
                balance ? parseFloat((balance.toFixed(3) * 0.5).toFixed(3)) : 0,
              )
            }
          >
            50%
          </div>
          <div
            className="border-[3px] border-white rounded-[28px] py-[16px] max-xsmall:py-[8px] text-center"
            onClick={() =>
              setUsdInput(
                balance ? parseFloat(balance.toFixed(3) * 0.75).toFixed(3) : 0,
              )
            }
          >
            75%
          </div>
        </div>
        <div className="bg-[#FFFFFF66] w-full rounded-[28px] text-[20px] flex mt-6">
          <input
            type="text"
            className="rounded-[28px] py-[18px] max-xsmall:py-[14px] pl-[20px] w-full"
            placeholder="Introduzca un importe"
            value={currencyInput}
            readOnly
          />
          <div className="bg-white rounded-[28px] text-[#37C100] flex items-center justify-center px-10 w-[130px] min-w-[130px]">
            {isLoading ? "..." : activeCurrency?.country}
          </div>
        </div>
        <button className="text-[#37C100] bg-[#E7FF2B] text-[30px] max-xsmall:text-[24px] rounded-[28px] py-[16px] max-xsmall:py-[10px] mt-[20px]">
          Retirar{" "}
        </button>
        <p className="text-[#FFFFFF] text-[11px] text-center px-[30px] mt-6 max-xsmall:mt-2">
          Asegúrese de que los datos se introducen correctamente, en caso de
          error los fondos pueden perderse para siempre
        </p>
      </form>
    </>
  );
};

export default UsdInput;
