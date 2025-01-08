import HistoryItem from "../components/Wallet/HistoryPage/HistoryItem";

const History = () => {
  const history = [];

  return (
    <>
      <div className="w-full h-full mt-[40px] overflow-auto flex flex-col gap-[70px]">
        {history?.map((el) => (
          <HistoryItem key={el.name + el.price} data={el} />
        ))}
        <div className="w-full text-center">Su historial está limpio</div>
      </div>
    </>
  );
};

export default History;
