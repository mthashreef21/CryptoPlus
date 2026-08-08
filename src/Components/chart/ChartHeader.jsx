import { useSelector } from "react-redux";
import { useGetCoinsQuery } from "../../Features/CryptoApi";

function ChartHeader() {
  const selectedCoin = useSelector(
    (state) => state.crypto.selectedCoin
  );

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const chartType = useSelector(
    (state) => state.crypto.chartType
  );

  const { data, isLoading } =
    useGetCoinsQuery(selectedCurrency);

  if (isLoading) return null;

  const currentCoin = data
    ? data.find((coin) => coin.id === selectedCoin)
    : null;

  const titles = {
    prices: "Cryptocurrency Price",
    market_caps: "Market Capitalization",
    total_volumes: "Trading Volume",
  };

  const subtitles = {
    prices: "Price movement over selected period",
    market_caps:
      "Market capitalization over selected period",
    total_volumes:
      "Trading volume over selected period",
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left Side */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {titles[chartType]}
        </h2>

        <p className="text-gray-500">
          {subtitles[chartType]}
        </p>
      </div>

      {/* Right Side */}
      {currentCoin && (
        <div className="flex items-center gap-3">
          <img
            src={currentCoin.image}
            alt={currentCoin.name}
            className="w-10 h-10"
          />

          <div>
            <h3 className="font-semibold">
              {currentCoin.name}
            </h3>

            <p className="text-sm text-gray-500 uppercase">
              {currentCoin.symbol}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartHeader;