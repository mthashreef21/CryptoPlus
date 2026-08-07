import FilterBar from "../Components/Filter/FilterBar";
import NavBar from "../Components/Nav/NavBar";
import ChartSection from "../Components/Chart/ChartSection";
import PortfolioCard from "../Components/Portfolio/PortfolioCard";
import MarketCapList from "../Components/Sidebar/MarketCapList";
import ExchangeCard from "../Components/Exchange/ExchangeCard";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4">

      <div className="space-y-6">

        <NavBar />

        <FilterBar />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Side */}

          <div className="lg:col-span-3 space-y-6">

            <ChartSection />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <PortfolioCard />

              <ExchangeCard />

            </div>

          </div>

          {/* Right Side */}

          <div className="h-full">
            <MarketCapList />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;