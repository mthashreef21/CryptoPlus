import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({ chartData }) {
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
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.15)",
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [labels, chartValues, chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },

      title: {
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

    elements: {
      point: {
        radius: 0,
        hoverRadius: 5,
      },
    },
  };

  return (
    <div className="w-full h-[350px] mt-6">
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default LineChart;