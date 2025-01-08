import { format, parseISO } from "date-fns";
export const groupTransactionsByDate = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = format(parseISO(transaction.createdAt), "MMMM dd");

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});
};
