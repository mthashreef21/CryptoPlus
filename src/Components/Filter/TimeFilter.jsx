import { useDispatch, useSelector } from "react-redux";
import { setSelectedDays } from "../../features/cryptoSlice";

const timeRanges = [
  { label: "1D", value: 1 },
  { label: "1W", value: 7 },
  { label: "1M", value: 30 },
  { label: "6M", value: 180 },
  { label: "1Y", value: 365 },
];

function TimeFilter() {
  const dispatch = useDispatch();

  const selectedDays = useSelector(
    (state) => state.crypto.selectedDays
  );

  return (
    <div className="flex gap-2">
      {timeRanges.map((item) => (
        <button
          key={item.label}
          onClick={() => dispatch(setSelectedDays(item.value))}
          className={`px-4 py-2 rounded-lg border transition ${
            selectedDays === item.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default TimeFilter;