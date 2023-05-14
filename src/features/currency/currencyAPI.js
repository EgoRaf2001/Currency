export function fetchCurrencies() {
  return fetch("https://api.freecurrencyapi.com/v1/latest?apikey=b54tzDcAbjxIdf8crWThuhSDxL0XISrlZnShXaAs")
    .then(response => response.json())
    .then(data => {
      return { data: data };
    });
}

export function fetchSelectedExchangeRate(from, to) {
  return fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=b54tzDcAbjxIdf8crWThuhSDxL0XISrlZnShXaAs&currencies=${to}&base_currency=${from}`)
    .then(response => response.json())
    .then(data => {
      return { data: data };
    });
}