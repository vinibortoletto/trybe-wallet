const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = async () => {
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
};

export const fetchCurrenciesCodes = async () => {
  const currencies = await fetchCurrencies();

  return Object
    .entries(currencies)
    .reduce((acc, currency) => {
      if (currency[0] !== 'USDT') acc.push(currency[1].code);
      return acc;
    }, []);
};
