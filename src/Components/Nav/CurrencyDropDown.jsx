import { useDispatch, useSelector } from "react-redux";
import { setSelectedCurrency } from "../../Features/CryptoSlice";

function CurrencyDropdown() {
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => dispatch(setSelectedCurrency(e.target.value))}
      className="w-full sm:w-24 lg:w-28 h-12 px-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="usd">USD</option>
      <option value="inr">INR</option>
      <option value="eur">EUR</option>
    </select>
  );
}

export default CurrencyDropdown;