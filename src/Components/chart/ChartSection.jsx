import { useSelector } from "react-redux";
import { useGetCoinChartQuery } from "../../Features/CryptoApi";
import ChartHeader from "./ChartHeader";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

function ChartSection() {
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency,
  );

  const selectedDays = useSelector((state) => state.crypto.selectedDays);

  const selectedChart = useSelector((state) => state.crypto.selectedChart);

  const { data, isLoading, error } = useGetCoinChartQuery({
    coinId: selectedCoin,
    currency: selectedCurrency,
    days: selectedDays,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 h-[430px] flex items-center justify-center">
        Loading Chart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 h-[430px] flex items-center justify-center">
        Error Loading Chart
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <ChartHeader />

      {selectedChart === "line" ? (
        <LineChart chartData={data} />
      ) : (
        <BarChart chartData={data} />
      )}
    </div>
  );
}

export default ChartSection;
