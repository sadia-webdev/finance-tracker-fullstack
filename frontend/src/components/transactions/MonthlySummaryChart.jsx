import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../lib/api/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const MonthlySummaryChart = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["monthly-summary"],
    queryFn: async () => {
      const res = await api.get("/transactions/monthly-summary");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading chart...</p>;
  if (isError) return <p>{error.message}</p>;

  const chartData = [
    { name: "Income", value: data.income },
    { name: "Expense", value: data.expense },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Summary</CardTitle>
      </CardHeader>

      <CardContent style={{ height: 300 }}>
        {" "}
        {/* Fixed height */}
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />

            {/* Income area */}
            <Area
              type='monotone'
              dataKey={(d) => (d.name === "Income" ? d.value : 0)}
              stroke='#22c55e'
              fill='#bbf7d0'
              strokeWidth={2}
            />

            {/* Expense area */}
            <Area
              type='monotone'
              dataKey={(d) => (d.name === "Expense" ? d.value : 0)}
              stroke='#ef4444'
              fill='#fecaca'
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlySummaryChart;
