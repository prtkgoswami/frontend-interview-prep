import React, { useMemo } from "react";
import Bar from "./Bar";
import "./ChartContainer.css";

const ChartContainer = ({ data, xAxisLabelText, yAxisLabelText }) => {
  const maxCount = useMemo(() => {
    return data.reduce((maxItem, item) => Math.max(maxItem, item.count), 0);
  }, [data]);
  return (
    <div id="chart-container">
      <div id="chart">
        {data.map((item) => (
          <Bar key={item.id} {...item} height={(item.count / maxCount) * 100} />
        ))}
      </div>
      <p id="x-axis-label">{xAxisLabelText}</p>
      <p id="y-axis-label">{yAxisLabelText}</p>
    </div>
  );
};

export default ChartContainer;
