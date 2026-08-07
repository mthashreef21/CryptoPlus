import { useSelector } from "react-redux";

function CoinItem({ coin }) {
  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const currencySymbols = {
    usd: "$",
    inr: "₹",
    eur: "€",
  };

  const currencySymbol = currencySymbols[selectedCurrency] || "$";

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition">

      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-10 h-10"
        />

        <div>
          <h3 className="font-semibold">{coin.name}</h3>

          <p className="text-sm text-gray-500 uppercase">
            {coin.symbol}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <h3 className="font-semibold">
          {currencySymbol}
          {coin.current_price.toLocaleString()}
        </h3>

        <p
          className={`text-sm font-medium ${
            coin.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

    </div>
  );
}

export default CoinItem;