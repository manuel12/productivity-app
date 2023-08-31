import { FC } from "react";
import { Bar } from "react-chartjs-2";

import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";

Chart.register(LinearScale);
Chart.register(CategoryScale);

interface LearningItem {
  learningText: string;
  learningValue: number;
}

interface BarChartProps {
  chartData: LearningItem[];
  title: string;
  singleColor: boolean;
}

const BarChart: FC<BarChartProps> = ({
  chartData,
  title,
  singleColor = true,
}) => {
  const learnings = chartData.map((item: any) => item.learningText);
  const amounts = chartData.map((item: any) => item.learningValue);

  const options = {
    responsive: true,

    legend: {
      display: false,
    },
    title: {
      display: true,
      text: title,
    },
    scales: {
      // yAxes: [
      //   {
      //     ticks: {
      //       beginAtZero: true,
      //     },
      //   },
      // ],
    },
  };

  const backgroundColor = singleColor
    ? "rgb(54, 162, 235)"
    : [
        "rgb(219, 112, 147)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(122, 235, 52)",
        "rgb(75, 192, 192)",
        "rgb(0, 255, 255)",
        "rgb(255, 99, 132)",
        "rgb(162, 52, 235)",
        "rgb(235, 52, 208)",
        "rgb(255, 69, 0)",
        "rgb(255, 105, 180)",
        "rgb(0, 100, 0)",
      ];

  const data = {
    labels: learnings,
    datasets: [
      {
        label: "Learnings",
        data: amounts,
        backgroundColor: backgroundColor,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
