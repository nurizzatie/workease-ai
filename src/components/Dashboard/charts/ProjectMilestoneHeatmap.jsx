import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ProjectMilestoneHeatmap = () => {
  // Simulated realistic project data
  const phases = ["Research", "User Flow", "Prototype", "Design", "Testing"];
  const weeks = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
  ];

  const generateData = () =>
    weeks.map(() => Math.floor(Math.random() * 100)); // percentage progress

  const [state] = useState({
    series: phases.map((phase) => ({
      name: phase,
      data: generateData(),
    })),

    options: {
      chart: {
        height: 350,
        type: "heatmap",
        toolbar: { show: false },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: 0, to: 20, name: "Low", color: "#E0E7FF" },
              { from: 21, to: 50, name: "Medium", color: "#A5B4FC" },
              { from: 51, to: 80, name: "High", color: "#6366F1" },
              { from: 81, to: 100, name: "Critical", color: "#4338CA" },
            ],
          },
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: weeks,
        labels: { style: { fontSize: "12px" } },
      },
      title: {
        text: "Project Milestones (Weekly Overview)",
        style: { fontSize: "16px", fontWeight: 600 },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val}% progress`,
        },
      },
    },
  });

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default ProjectMilestoneHeatmap;
