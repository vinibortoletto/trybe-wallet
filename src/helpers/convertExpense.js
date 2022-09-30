const convertExpense = ({ value, currency, exchangeRates }) => {
  const ask = Object
    .entries(exchangeRates)
    .reduce((acc, item) => {
      if (item[0] === currency) return item[1].ask;
      return acc;
    }, 0);

  return Number((value * ask).toFixed(2));
};

export default convertExpense;
