import { useState } from "react";
import {useSelector,useDispatch,} from "react-redux";
import { Trash2 } from "lucide-react";
import { useGetCoinsQuery } from "../../Features/CryptoApi";
import { removePortfolioCoin } from "../../Features/CryptoSlice";
import PortfolioPieChart from "./PortfolioPieChart";
import PortfolioModal from "./PortfolioModal";

function PortfolioCard() {
  const dispatch = useDispatch();

  const portfolio = useSelector(
    (state) => state.crypto.portfolio
  );

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const [openModal, setOpenModal] = useState(false);

  const { data: coins, isLoading } =
    useGetCoinsQuery(selectedCurrency);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-5">
        Loading Portfolio...
      </div>
    );
  }

  const currencySymbols = {
    usd: "$",
    inr: "₹",
    eur: "€",
  };

  const currencySymbol =
    currencySymbols[selectedCurrency] || "$";

  const portfolioData = portfolio
    .map((item) => {
      const coin = coins.find(
        (c) => c.id === item.id
      );

      if (!coin) return null;

      return {
        id: coin.id,
        image: coin.image,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        quantity: item.quantity,
        price: coin.current_price,
        value:
          coin.current_price * item.quantity,
      };
    })
    .filter(Boolean);

  const totalValue = portfolioData.reduce(
    (sum, coin) => sum + coin.value,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Portfolio
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add Coin
        </button>

      </div>

      {/* Total Value */}

      <h3 className="text-2xl font-bold text-blue-600 mb-5">
        {currencySymbol}
        {totalValue.toLocaleString()}
      </h3>

      {portfolioData.length === 0 ? (
        <div className="text-center py-12 text-gray-500">

          <p className="text-lg">
            No coins in portfolio.
          </p>

          <p className="text-sm mt-2">
            Click "Add Coin" to begin.
          </p>

        </div>
      ) : (
        <>

          {/* Pie Chart */}

          <PortfolioPieChart
            portfolio={portfolioData}
          />

          {/* Coin List */}

          <div className="mt-6 space-y-4">

            {portfolioData.map((coin) => {

              const percentage = (
                (coin.value / totalValue) *
                100
              ).toFixed(1);

              return (
                <div
                  key={coin.id}
                  className="flex justify-between items-center border-b pb-3"
                >

                  {/* Left */}

                  <div className="flex items-center gap-3">

                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-10 h-10"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {coin.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {coin.quantity} {coin.symbol}
                      </p>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="flex items-center gap-4">

                    <div className="text-right">

                      <h3 className="font-semibold">
                        {currencySymbol}
                        {coin.value.toLocaleString()}
                      </h3>

                      <p className="text-sm text-gray-500">
                        @{currencySymbol}
                        {coin.price.toLocaleString()}
                      </p>

                      <p className="text-green-600 text-xs">
                        {percentage}% of portfolio
                      </p>

                    </div>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Remove ${coin.name} from portfolio?`
                          )
                        ) {
                          dispatch(
                            removePortfolioCoin(
                              coin.id
                            )
                          );
                        }
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </>
      )}

      {/* Modal */}

      {openModal && (
        <PortfolioModal
          coins={coins}
          onClose={() =>
            setOpenModal(false)
          }
        />
      )}

    </div>
  );
}

export default PortfolioCard;