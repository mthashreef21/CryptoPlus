import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ chartData }) {
  const chartType = useSelector(
    (state) => state.crypto.chartType
  );

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const selectedDays = useSelector(
    (state) => state.crypto.selectedDays
  );

  const chartValues = chartData?.[chartType] || [];

  const currencySymbols = {
    usd: "$",
    inr: "₹",
    eur: "€",
    gbp: "£",
    jpy: "¥",
  };

  const labels = useMemo(() => {
    return chartValues.map(([timestamp]) => {
      const date = new Date(timestamp);

      if (selectedDays === 1) {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });
  }, [chartValues, selectedDays]);

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: chartType.replace("_", " ").toUpperCase(),
          data: chartValues.map((item) => item[1]),
          backgroundColor: "#2563eb",
          borderRadius: 6,
          barThickness: 8,
        },
      ],
    };
  }, [labels, chartValues, chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            `${currencySymbols[selectedCurrency] || ""}${context.parsed.y.toLocaleString()}`,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          maxTicksLimit: selectedDays === 1 ? 12 : 8,
        },

        grid: {
          display: false,
        },
      },

      y: {
        ticks: {
          callback: (value) =>
            `${currencySymbols[selectedCurrency] || ""}${Number(value).toLocaleString()}`,
        },

        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="w-full h-[350px] mt-6">
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default BarChart;