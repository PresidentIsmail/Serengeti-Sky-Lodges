import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/card";
import format from "date-fns/format";
import { memo } from "react";

const SalesChart = ({ bookings = [] }) => {
  // get the totalprice, extrasprice and startdate from each booking. than map it to a new array called data. convert the startdate to a string in the format of "Jan 1"
  const data = bookings.map((booking) => {
    return {
      totalSales: booking.totalprice,
      extraSales: booking.extrasprice,
      label: format(new Date(booking.startdate), "MMM d"),
    };
  });

  // get all the days to display something like, "Sales from Jan 1 to Jan 7"
  const firstDay = format(new Date(bookings[0].startdate), "MMM d");
  const lastDay = format(
    new Date(bookings[bookings.length - 1].startdate),
    "MMM d",
  );

  return (
    <Card className="flex flex-col gap-8 p-4">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">
        Sales from {firstDay} &ndash; {lastDay}{" "}
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="label" />
          <YAxis unit="$" />
          <Tooltip />
          <CartesianGrid strokeDasharray="4" />
          {/* total sales area graph */}
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#8884d8"
            fill="#8884d8"
            strokeWidth={2}
            name="Total Sales"
            unit={"$"}
          />
          {/* extra sales area graph */}
          <Area
            type="monotone"
            dataKey="extraSales"
            stroke="#82ca9d"
            fill="#82ca9d"
            strokeWidth={2}
            name="Extra Sales"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default memo(SalesChart);
