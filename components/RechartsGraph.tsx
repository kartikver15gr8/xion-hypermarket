"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  TooltipProps,
} from "recharts";

interface DataItem {
  discountPercent: number;
  usdcAmount: number;
  numberOfBidders: number;
}

interface ChartDataItem {
  discountPercent: string;
  usdcAmount: number;
  numberOfBidders: number;
}

interface ActivityContainerGraphProps {
  data: DataItem[];
}

const RechartsGraph: React.FC<ActivityContainerGraphProps> = ({ data }) => {
  const chartData: ChartDataItem[] = data.map((item) => ({
    discountPercent: `${item.discountPercent}%`,
    usdcAmount: item.usdcAmount,
    numberOfBidders: item.numberOfBidders,
  }));

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length && payload[0].value) {
      return (
        <div className="custom-tooltip bg-[#e4e4e4] p-[10px] border rounded border-[#ccc] text-[12px]">
          <p>{`Discount: ${label}`}</p>
          <p>{`USDC Amount: $${payload[0].value.toFixed(2)}`}</p>
          <p>{`Number of Bidders: ${
            (payload[0].payload as ChartDataItem).numberOfBidders
          }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        className=""
        data={chartData}
        margin={{
          top: 15,
          right: 10,
          left: 10,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="discountPercent"
          label={{
            value: "DISCOUNT",
            position: "bottom",
            offset: 15,
            fontSize: 12,
          }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          label={{
            value: "Pool value in USDC",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "" },
            offset: 0,
            dy: 50,
            fontSize: 12,
          }}
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ fontSize: "12px" }}
        />
        <Bar dataKey="usdcAmount" fill="#666666" name="USDC Bid Amount">
          <LabelList
            dataKey="numberOfBidders"
            position="top"
            style={{ fontSize: "10px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RechartsGraph;
