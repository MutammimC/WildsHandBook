import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // Makes it horizontal
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Horizontal Bar Chart" },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;