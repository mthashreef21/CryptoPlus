import { useSelector } from "react-redux";
import { useGetCoinsQuery } from "../../Features/CryptoApi";
import CoinItem from "./CoinItem";

function MarketCapList() {
  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const searchTerm = useSelector(
    (state) => state.crypto.searchTerm
  );

  const {
    data,
    isLoading,
    error,
  } = useGetCoinsQuery(selectedCurrency);

  const filteredCoins =
    data?.filter(
      (coin) =>
        coin.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        coin.symbol
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-5 h-[820px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-5 h-[820px]">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 h-[820px] flex flex-col">

      <h2 className="text-xl font-semibold mb-4">
        Market Cap
      </h2>

      <div className="flex-1 overflow-y-auto pr-2">

        <div className="space-y-2">

          {filteredCoins.map((coin) => (
            <CoinItem
              key={coin.id}
              coin={coin}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default MarketCapList;