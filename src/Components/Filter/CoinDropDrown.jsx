import { useDispatch, useSelector } from "react-redux";
import { useGetCoinsQuery } from "../../features/cryptoApi";
import { setSelectedCoin } from "../../features/cryptoSlice";

function CoinDropDown() {
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const selectedCoin = useSelector(
    (state) => state.crypto.selectedCoin
  );

  const { data, isLoading } =
    useGetCoinsQuery(selectedCurrency);

  if (isLoading) {
    return (
      <select
        disabled
        className="border rounded-lg px-4 py-2"
      >
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      value={selectedCoin}
      onChange={(e) =>
        dispatch(setSelectedCoin(e.target.value))
      }
      className="border rounded-lg px-4 py-2 bg-white"
    >
      {data?.map((coin) => (
        <option
          key={coin.id}
          value={coin.id}
        >
          {coin.name}
        </option>
      ))}
    </select>
  );
}

export default CoinDropDown;