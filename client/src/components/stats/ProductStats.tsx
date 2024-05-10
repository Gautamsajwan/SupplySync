"use client";
import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";
import { BarChart } from "@tremor/react";
import toast from "react-hot-toast";

type batchCharts = {
  chart1: [];
  chart2: [];
  chart3: [];
  chart4: [];
};

type Props = {};

function ProductStats({}: Props) {
  const [chartData, setChartData] = useState<any>([]);

  const [checkPointData, setCheckPointData] = useState<batchCharts>({
    chart1: [],
    chart2: [],
    chart3: [],
    chart4: [],
  });
  const [fetchCount, setFetchCount] = useState(0);
  const [fetchCheckPoint, setFetchCheckPoint] = useState(0);

  useEffect(() => {
    const fetchLogDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/get-log-detail`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              batchId: 66236922248408,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          setChartData(result.Data);
        } else {
          toast.error(result.message);
        }

        console.log("result: ", result);
        setFetchCount((prevCount) => prevCount + 1);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    if (fetchCount < 5) {
      const intervalId = setInterval(fetchLogDetails, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/get-batch-detail`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              currentCheckpoint: fetchCheckPoint+1,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          if (fetchCheckPoint === 0)
            setCheckPointData((prev) => ({
              ...prev,
              chart1: result.Data,
            }));
          else if (fetchCheckPoint === 1)
            setCheckPointData((prev) => ({
              ...prev,
              chart2: result.Data,
            }));
          else if (fetchCheckPoint === 2)
            setCheckPointData((prev) => ({
              ...prev,
              chart3: result.Data,
            }));
          else
            setCheckPointData((prev) => ({
              ...prev,
              chart4: result.Data,
            }));
        } else {
          toast.error(result.message);
        }

        setFetchCheckPoint((prevCount) => prevCount + 1);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    if (fetchCheckPoint < 4) {
      const intervalId = setInterval(fetchBatchDetails, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [fetchCheckPoint]);

  return (
    <div className="min-h-screen flex flex-col justify-center text-white max-w-7xl mx-auto font-poppins">
      <div className="w-full flex flex-col gap-4 p-7 pb-12">
        <h1 className="text-2xl font-bold">Log Details</h1>
        <p className="">Temperature Humidity & Shock</p>
        <AreaChart
          showAnimation={true}
          className="h-80"
          data={chartData}
          index="time"
          categories={["temperature", "humidity", "shock"]}
          colors={["indigo", "rose", "green"]}
          yAxisWidth={30}
          showGridLines={true}
          onValueChange={(v) => console.log(v)}
        />
      </div>

      <h1 className="pl-7 text-2xl font-bold">Batch Details</h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="w-full flex flex-col gap-4 p-7">
          <p className="">CheckPoint 1</p>
          <BarChart
            showAnimation={true}
            className="h-80"
            data={checkPointData.chart1}
            index="time"
            categories={["temperature", "humidity", "shock"]}
            colors={["indigo", "rose", "green"]}
            yAxisWidth={30}
            showGridLines={true}
            onValueChange={(v) => console.log(v)}
          />
        </div>
        <div className="w-full flex flex-col gap-4 p-7">
          <p className="">CheckPoint 2</p>
          <BarChart
            showAnimation={true}
            className="h-80"
            data={checkPointData.chart2}
            index="time"
            categories={["temperature", "humidity", "shock"]}
            colors={["indigo", "rose", "green"]}
            yAxisWidth={30}
            showGridLines={true}
            onValueChange={(v) => console.log(v)}
          />
        </div>
        <div className="w-full flex flex-col gap-4 p-7">
          <p className="">CheckPoint 3</p>
          <BarChart
            showAnimation={true}
            className="h-80"
            data={checkPointData.chart3}
            index="time"
            categories={["temperature", "humidity", "shock"]}
            colors={["indigo", "rose", "green"]}
            yAxisWidth={30}
            showGridLines={true}
            onValueChange={(v) => console.log(v)}
          />
        </div>
        <div className="w-full flex flex-col gap-4 p-7">
          <p className="">CheckPoint 4</p>
          <BarChart
            showAnimation={true}
            className="h-80"
            data={checkPointData.chart4}
            index="time"
            categories={["temperature", "humidity", "shock"]}
            colors={["indigo", "rose", "green"]}
            yAxisWidth={30}
            showGridLines={true}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductStats;
