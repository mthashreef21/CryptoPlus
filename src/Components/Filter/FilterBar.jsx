import ChartTypeDropDown from "../chart/ChartTypeDropDown";
import CoinDropDrown from "./CoinDropDrown";
import TimeFilter from "./TimeFilter";

function FilterBar() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col lg:flex-row justify-between items-center gap-4">
      <TimeFilter />

      <div className="flex flex-col sm:flex-row gap-4">
        <CoinDropDrown />
        <ChartTypeDropDown />
      </div>
    </div>
  );
}

export default FilterBar;