import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

function PortfolioPieChart({ portfolio }) {
  const data = {
    labels: portfolio.map((coin) => coin.name),

    datasets: [
      {
        data: portfolio.map((coin) => coin.value),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#EC4899",
          "#84CC16",
        ],

        borderColor: "#fff",
        borderWidth: 2,

        hoverOffset: 18,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right",

        labels: {
          boxWidth: 18,
          padding: 18,
          font: {
            size: 14,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw.toLocaleString()}`;
          },
        },
      },

      datalabels: {
        color: "#fff",

        font: {
          weight: "bold",
          size: 14,
        },

        formatter: (value, context) => {
          const total = context.dataset.data.reduce(
            (a, b) => a + b,
            0
          );

          const percentage = ((value / total) * 100).toFixed(1);

          return percentage + "%";
        },
      },
    },
  };

  return (
    <div className="h-[250px]">
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
}

export default PortfolioPieChart;