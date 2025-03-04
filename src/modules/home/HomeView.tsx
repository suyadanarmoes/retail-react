("use client");

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip as ChartTooltip,
  YAxis,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import api from "@/api";
import { DotLottiePlayer } from "@dotlottie/react-player";

const HomeView = () => {
 

  const { data: sale } = api.sale?.getallsale.useQuery() ?? {};

  const { data: stock } = api.product?.fetchStocks.useQuery() ?? {};

  const { data: summary } = api.sale?.getsalereport.useQuery() ?? {};
  console.log(summary?.totalPrice, summary?.totalProfit);

  //const { data: user } = api.user?.getalluser.useQuery() ?? {};
  
  const barChartConfig = {
    price: {
      label: "totalPrice",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "totalProfit",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  
  // const pieChartConfig = {
  //   userName: {
  //     label: "Users",
  //   },
  //   amount: {
  //     label: "amount",
  //     color: "hsl(var(--chart-2))",
  //   },
  //   other: {
  //     label: "Other",
  //     color: "hsl(var(--chart-5))",
  //   },
  // } satisfies ChartConfig;

  // const totalusers = React.useMemo(() => {
  //   return (user ?? []).length;
  // }, []);

  // const colorArray = [
  //   "#FF6384",
  //   "#36A2EB",
  //   "#FFCE56",
  //   "#4BC0C0",
  //   "#9966FF",
  //   "#FF9F40",
  // ];

  return (
    <div className="p-6 min-h-screen bg-cover bg-center">
      <h1 className="text-3xl font-extrabold text-center text-green-950 flex justify-center mb-3">
        Welcome to Fruitopia
        <DotLottiePlayer
          src="https://lottie.host/351b1f66-2cbd-47d8-8344-8f15fb4b424a/SkmX43gJKa.lottie"
          autoplay
          loop
          className="w-30 h-20 text-center"
        />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className=" shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Sale Profit💸
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            ${summary?.totalProfit ?? 0}
          </p>
        </div>
        <div className=" shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Sale Revenue💵
          </h2>
          <p className="text-3xl font-bold text-green-600">
            ${summary?.totalPrice ?? 0}
          </p>
        </div>
        <div className="shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Sale Count🛍
          </h2>
          <p className="text-3xl font-bold text-yellow-600">{sale?.length}</p>
        </div>
        <div className=" shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Product Count🍱
          </h2>
          <p className="text-3xl font-bold text-red-600">{stock?.length}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center items-center text-lg font-semibold">
              📊 Sales Report Bar Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sale ? (
              <ChartContainer config={barChartConfig}>
                <BarChart
                  data={sale}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="salesDate"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip
                    cursor={{ fill: "rgba(0,0,0,0.1)" }}
                    content={
                      <ChartTooltipContent
                      // indicator="solid"
                      />
                    }
                  />
                  <Legend />
                  <Bar
                    dataKey="totalProfit"
                    fill="#6CB83C"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="totalPrice"
                    fill="#E2A765"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="text-center text-gray-500">
                Loading sales data...
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default HomeView;