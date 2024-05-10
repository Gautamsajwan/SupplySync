"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "keep-react";
import { PackageOpen, Syringe } from "lucide-react";

const data = [
  {
    date: new Date("2024-03-25"),
    title: "Checkpoint 1 reached",
    description: "the package was delivered at checkpoint 1",
  },
  {
    date: new Date("2024-03-27"),
    title: "Checkpoint 2 reached",
    description: "the package was delivered at checkpoint 2",
  },
  {
    date: new Date("2024-04-01"),
    title: "Checkpoint 2 reached",
    description: "the package was delivered at checkpoint 3",
  },
  {
    date: new Date("2024-04-02"),
    title: "Checkpoint 2 reached",
    description: "the package was delivered at checkpoint 4",
  },
];

type Props = {};

function TimeLineList({}: Props) {
  const [timelineData, setTimelineData] = useState<any>([]);
  useEffect(() => {
    setTimelineData(data);
  }, []);

  const displayTimeLineData = timelineData.map((data: any, index: number) => (
    <>
      <Timeline.Item key={index}>
        <Timeline.Point className="w-fit h-fit border-none bg-[#28282B]">
          <PackageOpen className="text-white z-20 -translate-x-[3px]"/>
        </Timeline.Point>
        <Timeline.Content className="px-2">
          <p className="text-body-5 font-semibold leading-[1.4] text-yellow-300">
            {data.date.toLocaleDateString()}
          </p>
          <h1 className="text-body-3 font-bold text-green-400">
            {data.title}
          </h1>
          <p className="text-body-4 font-semibold text-gray-100">
            {data.description}
          </p>
        </Timeline.Content>
      </Timeline.Item>
    </>
  ));

  return (
    <>
      <Timeline className="border-dashed border-l-[3px] border-blue-300">{displayTimeLineData}</Timeline>
    </>
  );
}

export default TimeLineList;
