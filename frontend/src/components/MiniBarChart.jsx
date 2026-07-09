import React from "react";

/**
 * Lightweight dependency-free bar chart.
 * data: array of { label, value }
 */
export default function MiniBarChart({
  data = [],
  width = 220,
  height = 60,
  color = "#635bff"
}) {
  if (!data.length) return null;

  const max = Math.max(...data.map((d) => d.value)) || 1;
  const gap = 6;
  const barWidth = (width - gap * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {data.map((d, i) => {
        const barHeight = (d.value / max) * (height - 6);
        const x = i * (barWidth + gap);
        const y = height - barHeight;
        return (
          <rect
            key={d.label + i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={3}
            fill={color}
            opacity={0.55 + (i / data.length) * 0.45}
          />
        );
      })}
    </svg>
  );
}
