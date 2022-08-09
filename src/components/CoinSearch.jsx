import React, { useState } from "react";
import CoinItem from "./CoinItem";

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="rounded-div my-4">
      <div className="flex w-full">
        <form className="my-4 mx-auto w-full md:w-auto">
          <input
            className="w-full bg-primary px-8 py-1 rounded-2xl shadow-xl outline-none border border-red-100"
            type="text"
            placeholder="Search a coin"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
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
              <CoinItem coin={coin} key={coin.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinSearch;
