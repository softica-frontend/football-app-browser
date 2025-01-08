const StartedText = ({ onOk }) => {
  return (
    <form
      className="text-[18px] text-justify flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onOk();
      }}
    >
      <h1 className="text-center text-[24px]">Introduzca sus datos</h1>
      <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
        <input className="w-full" placeholder="Escriba su nombre" required />
      </div>
      <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
        <input
          className="w-full"
          placeholder="Introduzca su número de tarjeta"
          required
        />
      </div>
      <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
        <input
          className="w-full"
          placeholder="Introduzca el nombre de su banco (opcional)"
        />
      </div>
      <div className="flex gap-2 w-full items-center  mt-4">
        <button className=" bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1">
          Ok
        </button>
        {/* <button
          onClick={onCancel}
          className="w-full rounded-md outline outline-2 outline-[#E7FF2B] py-1"
        >
          Cancel
        </button> */}
      </div>
    </form>
  );
};

export default StartedText;
