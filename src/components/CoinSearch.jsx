import React, { useState, useEffect, useRef, useContext } from "react";
import CoinItem from "./CoinItem";
import { ThemeContext } from "../context/ThemeContext";

const CoinSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const select = useRef(null);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=true`;

  const getCoins = async () => {
    const api = await fetch(url);
    const response = await api.json();
    setCoins(response);
  };

  useEffect(() => {
    getCoins();
  }, [url]);

  const { theme } = useContext(ThemeContext);

  return (
    <div className="rounded-div my-4">
      <div className="flex w-full">
        <form className="my-4 mx-auto w-full md:w-auto flex">
          <input
            className="w-full bg-primary px-8 py-1 rounded-2xl shadow-xl outline-none border border-red-100"
            type="text"
            placeholder="Search a coin"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <select
            className={
              theme === "dark"
                ? "mx-4 px-2 rounded-md bg-primary border-2 border-gray-300"
                : "mx-4 px-2 rounded-md bg-primary border-2 border-gray-300"
            }
            ref={select}
            name="Currency"
            value={currency}
            onChange={() => {
              setCurrency(select.current.value);
            }}
          >
            <option value="inr">INR</option>
            <option value="usd">USD</option>
          </select>
        </form>
      </div>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-2 text-sm vsm:text-base vsm:px-4">#</th>
            <th className="text-left text-xs vsm:text-base">Coin</th>
            <th></th>
            <th className="text-xs vsm:text-base">Price</th>
            <th className="text-xs vsm:text-base">24h</th>
            <th className="hidden md:table-cell">24h Volume</th>
            <th className="hidden sm:table-cell">Mkt</th>
            <th className="text-xs vsm:text-base">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((val) => {
              if (searchText === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return val;
              }
            })
            .map((coin) => (
              <CoinItem coin={coin} key={coin.id} currency={currency} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinSearch;
