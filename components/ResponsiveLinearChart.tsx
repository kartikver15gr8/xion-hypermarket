// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Jan", sales: 400 },
//   { name: "Feb", sales: 300 },
//   { name: "Mar", sales: 600 },
//   { name: "Apr", sales: 800 },
//   { name: "May", sales: 500 },
//   { name: "Jun", sales: 700 },
//   { name: "Jul", sales: 100 },
//   { name: "Aug", sales: 330 },
//   { name: "Sep", sales: 140 },
//   { name: "Oct", sales: 1000 },
//   { name: "Nov", sales: 1209 },
//   { name: "Dec", sales: 1500 },
// ];

// const ResponsiveLinearChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height="80%">
//       <LineChart
//         data={data}
//         margin={{
//           top: 0,
//           right: 0,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//         <YAxis tick={{ fontSize: 12 }} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="sales"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default ResponsiveLinearChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  sales: number;
}

const data: DataPoint[] = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 600 },
  { name: "Apr", sales: 800 },
  { name: "May", sales: 500 },
  { name: "Jun", sales: 700 },
  { name: "Jul", sales: 100 },
  { name: "Aug", sales: 330 },
  { name: "Sep", sales: 140 },
  { name: "Oct", sales: 1000 },
  { name: "Nov", sales: 1209 },
  { name: "Dec", sales: 1500 },
];

interface CustomizedAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomizedAxisTick: React.FC<CustomizedAxisTickProps> = ({
  x = 0,
  y = 0,
  payload,
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
        {payload?.value}
      </text>
    </g>
  );
};

const ResponsiveLinearChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveLinearChart;
