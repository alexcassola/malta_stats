"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";
import { getPopulationBySex } from "@/lib/actions/population";
import { CHART_COLORS } from "@/lib/colors";

export default function PopulationBySexViz() {
  const [plotData, setPlotData] = useState<Array<{}>>([]);
  const [dataKeys, setDataKeys] = useState<Array<string>>([]);

  useEffect(() => {
    getPopulationBySex().then((data) => {
      console.log(data);
      setPlotData(data.data);
      setDataKeys(data.columns);
    });
  }, []);

  const renderGeoRegionTick = (tickProps: any): ReactNode => {
    const { x, y, payload, index, width, visibleTicksCount } = tickProps;
    const { value, offset } = payload;
    console.log(tickProps);
    if (index % 6 === 2) {
      return (
        <text
          x={x}
          y={y - 4}
          textAnchor="middle"
          fill="#fff"
          fontSize={15}
          dx={15}
          dy={20}
        >
          {payload.value}
        </text>
      );
    }
    const isLast = index === plotData.length - 1;
    if (index % 6 === 0 || isLast) {
      const pathX =
        Math.floor(
          isLast ? x - offset + width / visibleTicksCount : x - offset
        ) + 0.5;
      return (
        <path
          d={`M${pathX},${y-4}v${-35}`}
          stroke="#f00"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return plotData.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={plotData}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time_period" tick={true} />
      <XAxis
        dataKey="geographical_region"
        type="category"
        axisLine={false}
        tickLine={false}
        tick={renderGeoRegionTick}
        interval={0}
      />
      <YAxis width="auto" />
      <Tooltip />
      <Legend height={1} />
      {dataKeys.map((key, i) => (
        <Bar
          key={key}
          dataKey={key}
          fill={CHART_COLORS[i]}
          isAnimationActive={true}
        />
      ))}
    </BarChart>
  );
}
