import { useDispatch, useSelector } from "react-redux";
import { setSelectedChart } from "../../Features/CryptoSlice";

function ChartTypeDropDown() {
  const dispatch = useDispatch();

  const selectedChart = useSelector(
    (state) => state.crypto.selectedChart
  );

  return (
    <select
      value={selectedChart}
      onChange={(e) =>
        dispatch(setSelectedChart(e.target.value))
      }
      className="border rounded-lg px-4 py-2 bg-white"
    >
      <option value="line">Line Chart</option>
      <option value="bar">Bar Chart</option>
    </select>
  );
}

export default ChartTypeDropDown;