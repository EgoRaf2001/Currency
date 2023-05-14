import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrencies,
  selectCurrencies,
  currencyFrom,
  setCurrencyFrom,
  setCurrencyTo,
  currencyTo,
  getExchangeRate,
  toAmount,
  fromAmount,
  setToAmount,
  setFromAmount,
} from "./currencySlice";

export function Currency() {
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencies);
  const selectedCurrencyFrom = useSelector(currencyFrom);
  const selectedCurrencyTo = useSelector(currencyTo);
  const selectedToAmount = useSelector(toAmount);
  const selectedFromAmount = useSelector(fromAmount);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  useEffect(() => {
    if (selectedCurrencyFrom !== null && selectedCurrencyTo !== null) {
      dispatch(getExchangeRate({ selectedCurrencyFrom, selectedCurrencyTo }));
    }
  }, [selectedCurrencyFrom, selectedCurrencyTo]);

  const handleFrom = (e) => {
    dispatch(setCurrencyFrom(e.target.value));
  };

  const handleTo = (e) => {
    dispatch(setCurrencyTo(e.target.value));
  };

  const handleChangeFrom = (e) => {
    dispatch(setFromAmount(e.target.value));
  };

  const handleChangeTo = (e) => {
    dispatch(setToAmount(e.target.value));
  };

  return (
    <div className=" text-center m-auto  p-2.5">
      <div>
        <div className="text-4xl mb-3">Currency Converter</div>
      </div>
      <div>
        <div className="text-xl text-left mb-0.5 " >
          <label className=" mr-8 ">I Have</label>
          <label  className="ml-48">I Want</label>
        </div>
        <div className="text-left mb-0.5 ">
        <select
          onChange={handleFrom}
          className=" mr-2   rounded-md border-0 bg-transparent py-0 pl-1 pr-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        >
          {currencies.map((item) => {
            return (
              <option key={item.key} value={currencies.key}>
                {item.key}
              </option>
            );
          })}
        </select>

        <select
          onChange={handleTo}
          className=" ml-48  rounded-md border-0 bg-transparent py-0 pl-1 pr-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        >
          {currencies.map((item) => {
            return (
              <option key={item.key} value={currencies.key}>
                {item.key}
              </option>
            );
          })}
        </select>
        </div>
      </div>

      <div className="mt-1">
        <input
          type="number"
          onChange={handleChangeFrom}
          value={selectedFromAmount}
          className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        =
        <input
          type="number"
          onChange={handleChangeTo}
          value={selectedToAmount}
          className=" rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
