"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";
import { getPopulationTotals } from "@/lib/actions/population";
import { CHART_COLORS } from "@/lib/colors";

export default function PopulationTotalsViz() {
  const [plotData, setPlotData] = useState<Array<{}>>([]);
  const [dataKeys, setDataKeys] = useState<Array<string>>([]);

  useEffect(() => {
    getPopulationTotals().then((data) => {
      setPlotData(data.data);
      setDataKeys(data.columns);
    });
  }, []);

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
      <XAxis dataKey="time_period" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, i) => (
        <Bar key={key} dataKey={key} fill={CHART_COLORS[i]} isAnimationActive={true} />
      ))}
    </BarChart>
  );
}
