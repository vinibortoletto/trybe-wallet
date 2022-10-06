const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    const errorObj = {
      status: 404,
      message: 'Nenhuma rota encontrada',
      code: 'NotFound',
    };

    console.log('fetchCurrencies:', errorObj.message);
    return errorObj;
  }
};

export const fetchCurrenciesCodes = async () => {
  const currencies = await fetchCurrencies();

  if (!currencies.status) {
    return Object
      .entries(currencies)
      .reduce((acc, currency) => {
        if (currency[0] !== 'USDT') acc.push(currency[1].code);
        return acc;
      }, []);
  }

  return currencies;
};
