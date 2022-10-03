const sumTotalExpense = (expenses) => (
  expenses
    .reduce((acc, { value, currency, exchangeRates }) => {
      const { ask } = exchangeRates[currency];
      let sum = acc;
      sum += value * ask;
      return Number(sum.toFixed(2));
    }, 0)
);

export default sumTotalExpense;
