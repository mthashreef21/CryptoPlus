import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPortfolioCoin } from "../../Features/CryptoSlice";

function PortfolioModal({ coins, onClose }) {
  const dispatch = useDispatch();

  const [coinId, setCoinId] = useState(coins[0]?.id || "");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (!coinId || quantity <= 0) return;

    dispatch(
      addPortfolioCoin({
        id: coinId,
        quantity: Number(quantity),
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[350px]">
        <h2 className="text-xl font-semibold mb-5">
          Add Coin
        </h2>

        <select
          className="border rounded-lg w-full p-2 mb-4"
          value={coinId}
          onChange={(e) => setCoinId(e.target.value)}
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

        <input
          type="number"
          placeholder="Quantity"
          className="border rounded-lg w-full p-2 mb-5"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioModal;