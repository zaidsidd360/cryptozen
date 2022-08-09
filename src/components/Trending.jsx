import React, { useState, useEffect } from "react";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const urlTrending = "https://api.coingecko.com/api/v3/search/trending";

  const getTrending = async () => {
    const api = await fetch(urlTrending);
    const response = await api.json();
    console.log(response.coins);
    setTrending(response.coins);
  };

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div className="rounded-div my-12 py-8 text-primary no-shadow">
      <h1 className="text-2xl font-bold">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.map((coin) => (
          <div
            className="rounded-div flex justify-between p-4 lg:hover:scale-105 cursor-pointer ease-in-out duration-200"
            key={coin.item.coin_id}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <img
                  className="rounded-full mr-4"
                  src={coin.item.small}
                  alt="coin"
                />
                <div>
                  <p className="font-bold">{coin.item.name}</p>
                  <p>{coin.item.symbol}</p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  className="w-4 mr-2"
                  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                  alt="/"
                />
                <p>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
