import { useLayoutEffect, useState } from "react";
import { EditIcon } from "../UI/icons";
import { useDispatch, useSelector } from "react-redux";
import { TG_ID, updateUserName } from "../../util/back/requests";
import ErrorAlert from "../UI/errorAlert";
import { setUser } from "../../store/auth-slice";
import gsap from "gsap";

export default function HomeName() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.username);
  const [isEditing, setIsEditing] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();

  useLayoutEffect(() => {
    gsap.to("#nickname-text", { translateY: 0, opacity: 1 });
  }, []);

  const submitEditing = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    const response = await updateUserName(TG_ID, name);
    if (response) {
      dispatch(setUser({ ...user, username: name }));
      setIsEditing(false);
      setIsLoading(false);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2500);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isError && <ErrorAlert>Algo ha ido mal. Vuelve a intentarlo</ErrorAlert>}
      <div
        className="flex items-center gap-[10px] mt-[25px] -translate-y-[100px] opacity-0"
        id="nickname-text"
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <input
            type="text"
            value={name}
            autoFocus
            className="max-w-[100px]"
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="text-white/40 text-[18px]">{name}</p>
        )}

        <div className="h-max ">
          {isEditing ? (
            <div className="flex gap-2">
              <div
                className="bg-[#E7FF2B] rounded-[28px] text-[#37C100] px-2"
                onClick={submitEditing}
              >
                {isLoading ? "Ahorrar..." : "Guardar"}
              </div>
              <div
                className="border-[#37C100] border-2 rounded-[28px] text-white px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  setName(user.username);
                }}
              >
                Cancelar
              </div>
            </div>
          ) : (
            <div className="mb-2">
              <EditIcon />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
