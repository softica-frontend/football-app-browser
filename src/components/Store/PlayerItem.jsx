import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyNewPlayer,
  getBoughtPlayers,
  getUserInfo,
  selectPlayer,
  TG_ID,
} from "../../util/back/requests";
import ErrorAlert from "../UI/errorAlert";
import { setUser } from "../../store/auth-slice";
import Modal from "../UI/Modal";
import { setStatic } from "../../store/static-slice";

const PlayerItem = ({ player }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector((state) => state.auth);
  const boughtPlayers = useSelector((state) => state.static.boughtPlayers);
  const staticData = useSelector((state) => state.static);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [noBalance, setNoBalance] = useState(false);

  const updateUser = async () => {
    setIsLoading(true);
    try {
      const players = await getBoughtPlayers(TG_ID, player.id);
      const updatedUserInfo = await getUserInfo(TG_ID);
      if (players && updatedUserInfo) {
        dispatch(setStatic({ ...staticData, boughtPlayers: players }));
        dispatch(setUser(updatedUserInfo));
        setIsOpen(false);
      } else {
        handleError();
      }
    } catch (error) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 2500);
  };

  let status;

  if (user.currentPlayerId == player.id) {
    status = "SELECTED";
  } else if (boughtPlayers.some((element) => element.id == player.id)) {
    status = "BOUGHT";
  } else if (user.balance >= player.price) {
    status = "AVALIABLE";
  } else {
    status = "UNAVALIABLE";
  }

  const updatePlayer = async () => {
    // setIsLoading(false);
    const response = await selectPlayer(user.telegramId, player.id);
    if (response) {
      updateUser();
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2500);
    }
  };

  const buyPlayer = async () => {
    setIsLoading(true);
    const response = await buyNewPlayer(user.telegramId, player.id);
    if (response) {
      updateUser();
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2500);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        ¿De verdad quieres comprar este reproductor? {player.price} USD
        <div className="flex gap-2 w-full items-center  mt-4">
          <button
            onClick={buyPlayer}
            className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
          >
            Sí
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full rounded-md border-2 border-[#E7FF2B] py-1"
          >
            Cancelar
          </button>
        </div>
      </Modal>
      <div
        className={`football-player relative w-full min-h-[80%] h-[80%] bg-white/40 flex flex-col items-center rounded-[14px] mt-10 ${status == "SELECTED" ? "border-[3px] border-[#E7FF2B]" : ""}`}
      >
        <div className="absolute w-[100px] -bottom-[10px] z-10 bg-[#E7FF2B] text-[#37C100] text-[10px] py-1 rounded-[28px] text-center">
          {status == "SELECTED" && "SELECCIONADO"}
          {status == "BOUGHT" && (
            <div onClick={updatePlayer}>
              {isLoading ? "SELECCIONAR..." : "SELECCIONE"}
            </div>
          )}
          {status == "AVALIABLE" && (
            <div onClick={() => setIsOpen(true)}>
              {isLoading ? "Comprar... " : `COMPRAR ${player.price} USD`}
            </div>
          )}
          {status == "UNAVALIABLE" && (
            <div
              className="text-[#37C100]/70"
              onClick={() => {
                setNoBalance(true);
                setTimeout(() => setNoBalance(false), 2500);
              }}
            >
              COMPRAR {player.price} USD
            </div>
          )}
          {/* BUY {player.price} USD */}
        </div>

        <div className="absolute -top-8 h-[80%] max-h-[80%] flex flex-col items-center w-full">
          <img
            src={`./images/person/${player.id}.png`}
            alt="person"
            className="h-full max-h-full max-w-full"
          />

          <div className="bg-white rounded-[28px] text-[10px] text-[#37C100] w-[90px] py-1 text-center">
            {player.value} USD
          </div>

          <div className="text-[14px]">{player.name}</div>
        </div>
      </div>
      {isError && <ErrorAlert>Algo ha ido mal, inténtalo de nuevo</ErrorAlert>}
      {noBalance && <ErrorAlert>No tiene suficiente dinero </ErrorAlert>}
    </>
  );
};

export default PlayerItem;
