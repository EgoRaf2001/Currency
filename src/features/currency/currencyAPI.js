export function fetchCurrencies() {
  return fetch("https://api.freecurrencyapi.com/v1/latest?apikey=Z6JKP9GDo9N9GmiBRW9nI8v5D0o28ssIThYouNEb")
    .then(response => response.json())
    .then(data => {
      return { data: data };
    });
}

export function fetchSelectedExchangeRate(from, to) {
  return fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=Z6JKP9GDo9N9GmiBRW9nI8v5D0o28ssIThYouNEb&currencies=${to}&base_currency=${from}`)
  
    .then(response => response.json())
    .then(data => {
      return { data: data };
    })
}