// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function ActivityContainerGraph({ data }) {
//   const chartData = {
//     labels: data.map((item) => item.label),
//     datasets: [
//       {
//         label: "USDC Bid",
//         data: data.map((item) => item.value),
//         backgroundColor: [
//           "rgba(183, 183, 183, 0.8)",
//           "rgba(183, 183, 183, 0.8)",
//           "rgba(183, 183, 183, 0.8)",
//         ],
//         borderColor: [
//           "rgba(185, 185, 185, 1)",
//           "rgba(185, 185, 185, 1)",
//           "rgba(185, 185, 185, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             size: 14,
//           },
//           color: "#2b2a2a",
//         },
//       },
//       title: {
//         display: true,
//         text: "Pool Value in USDC",
//         font: {
//           size: 20,
//           weight: "bold",
//         },
//         color: "#666",
//       },
//       tooltip: {
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         titleFont: {
//           size: 16,
//         },
//         bodyFont: {
//           size: 14,
//         },
//         padding: 10,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.1)",
//         },
//         ticks: {
//           font: {
//             size: 12,
//           },
//           color: "#666",
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: 12,
//             family: "'Teachers', sans-serif",
//           },
//           color: "#666",
//         },
//       },
//     },
//   };

//   return <Bar data={chartData} options={options} />;
// }

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ActivityContainerGraph = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.map((item: any) => `${item.discountPercent}%`),
    datasets: [
      {
        label: "USDC Bid Amount",
        data: data.map((item: any) => item.usdcAmount),
        backgroundColor: "rgba(186, 186, 186, 0.8)",
        borderColor: "rgba(200, 200, 200, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Bids by Discount Percentage",
      //   font: {
      //     size: 18,
      //   },
      // },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataIndex = context.dataIndex;
            const usdcAmount = data[dataIndex].usdcAmount;
            const bidders = data[dataIndex].numberOfBidders;
            return [
              `USDC Amount: ${usdcAmount.toFixed(2)}`,
              `Number of Bidders: ${bidders}`,
            ];
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value: any, context: any) => {
          return data[context.dataIndex].numberOfBidders;
        },
        font: {
          weight: "light",
        },
        color: "#333",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Pool value in USDC",
          font: {
            size: 10,
            weight: "normal",
          },
        },

        ticks: {
          callback: (value: any) => `$${value}`,
        },
      },
      x: {
        title: {
          display: true,
          text: "DISCOUNT",
          font: {
            size: 10,
            weight: "normal",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ActivityContainerGraph;
