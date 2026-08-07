import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCoinsQuery } from "../../features/cryptoApi";

function ExchangeCard() {
  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const { data: coins, isLoading } =
    useGetCoinsQuery(selectedCurrency);

  const [sellCoin, setSellCoin] = useState("bitcoin");
  const [buyCoin, setBuyCoin] = useState("ethereum");
  const [amount, setAmount] = useState("");

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-5">
        Loading Exchange...
      </div>
    );
  }

  const sell = coins.find(
    (coin) => coin.id === sellCoin
  );

  const buy = coins.find(
    (coin) => coin.id === buyCoin
  );

  const receive =
    amount && sell && buy
      ? (
          (Number(amount) * sell.current_price) /
          buy.current_price
        ).toFixed(6)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-xl font-semibold mb-6">
        Exchange
      </h2>

      {/* Sell & Amount */}

      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-orange-500 font-medium mb-2">
            Sell
          </p>

          <select
            value={sellCoin}
            onChange={(e) =>
              setSellCoin(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          >
            {coins.map((coin) => (
              <option
                key={coin.id}
                value={coin.id}
              >
                {coin.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-gray-500 mb-2">
            Amount
          </p>

          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

      </div>

      {/* Buy */}

      <div className="mt-5">

        <p className="text-green-600 font-medium mb-2">
          Buy
        </p>

        <select
          value={buyCoin}
          onChange={(e) =>
            setBuyCoin(e.target.value)
          }
          className="w-full border rounded-xl p-3"
        >
          {coins.map((coin) => (
            <option
              key={coin.id}
              value={coin.id}
            >
              {coin.name}
            </option>
          ))}
        </select>

      </div>

      {/* Result */}

      <div className="mt-8 text-center">

        <p className="text-gray-500">
          You Receive
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {receive} {buy?.symbol.toUpperCase()}
        </h2>

      </div>

    </div>
  );
}

export default ExchangeCard;