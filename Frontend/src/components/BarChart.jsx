// import { useTheme } from "@mui/material";
// import { ResponsiveBar } from "@nivo/bar";
// import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";





// const BarChart = ({ isDashboard = false }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <ResponsiveBar
//       data={data}
//       theme={{
//         // added
//         axis: {
//           domain: {
//             line: {
//               stroke: colors.grey[100],
//             },
//           },
//           legend: {
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//           ticks: {
//             line: {
//               stroke: colors.grey[100],
//               strokeWidth: 1,
//             },
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//         },
//         legends: {
//           text: {
//             fill: colors.grey[100],
//           },
//         },
//       }}
//       keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
//       indexBy="country"
//       margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//       padding={0.3}
//       valueScale={{ type: "linear" }}
//       indexScale={{ type: "band", round: true }}
//       colors={{ scheme: "nivo" }}
//       defs={[
//         {
//           id: "dots",
//           type: "patternDots",
//           background: "inherit",
//           color: "#38bcb2",
//           size: 4,
//           padding: 1,
//           stagger: true,
//         },
//         {
//           id: "lines",
//           type: "patternLines",
//           background: "inherit",
//           color: "#eed312",
//           rotation: -45,
//           lineWidth: 6,
//           spacing: 10,
//         },
//       ]}
//       borderColor={{
//         from: "color",
//         modifiers: [["darker", "1.6"]],
//       }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? undefined : "country", // changed
//         legendPosition: "middle",
//         legendOffset: 32,
//       }}
//       axisLeft={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? undefined : "food", // changed
//         legendPosition: "middle",
//         legendOffset: -40,
//       }}
//       enableLabel={false}
//       labelSkipWidth={12}
//       labelSkipHeight={12}
//       labelTextColor={{
//         from: "color",
//         modifiers: [["darker", 1.6]],
//       }}
//       legends={[
//         {
//           dataFrom: "keys",
//           anchor: "bottom-right",
//           direction: "column",
//           justify: false,
//           translateX: 120,
//           translateY: 0,
//           itemsSpacing: 2,
//           itemWidth: 100,
//           itemHeight: 20,
//           itemDirection: "left-to-right",
//           itemOpacity: 0.85,
//           symbolSize: 20,
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemOpacity: 1,
//               },
//             },
//           ],
//         },
//       ]}
//       role="application"
//       barAriaLabel={function (e) {
//         return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
//       }}
//     />
//   );
// };

// export default BarChart;

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        const rawData = await response.json();
        const processedData = prepareData(rawData);
        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const prepareData = (data) => {
    const regionRelevanceMap = {};

    data.forEach((item) => {
      if (!regionRelevanceMap[item.region]) {
        regionRelevanceMap[item.region] = { region: item.region, relevance: 0, count: 0 };
      }
      regionRelevanceMap[item.region].relevance += item.relevance;
      regionRelevanceMap[item.region].count += 1;
    });

    return Object.values(regionRelevanceMap).map((item) => ({
      region: item.region,
      relevance: parseFloat((item.relevance / item.count).toFixed(2)), // Calculate average relevance and round to 2 decimals
    }));
  };

  const getColor = (relevance) => {
    if (relevance <= 2.0) return "#f47560";
    if (relevance <= 2.5) return "#f1e15b";
    if (relevance <= 3.0) return "#e8c1a0";
    if (relevance <= 4.0) return "#61cdbb";
    return "#97e3d5";
  };

  return (
    <ResponsiveBar
      data={data}
      keys={["relevance"]}
      indexBy="region"
      margin={{ top: 50, right: 180, bottom: 100, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ data }) => getColor(data.relevance)}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        format: (value) => value.slice(0, 3),
        legend: isDashboard ? undefined : "Region",
        legendPosition: "middle",
        legendOffset: 70,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Relevance",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableGridX={false}
      enableGridY={true}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      enableLabel={false}
      role="application"
      ariaLabel="Bar chart displaying relevance by region"
      barAriaLabel={(d) => `${d.id}: ${d.formattedValue} in region: ${d.indexValue}`}
      legends={ isDashboard ? undefined : [
        {
          data: [
            { label: "Less Relevant (<2.0)", color: "#f47560" },
            { label: "Somewhat Relevant (2.0-2.5)", color: "#f1e15b" },
            { label: "Moderately Relevant (2.5-3.0)", color: "#e8c1a0" },
            { label: "Very Relevant (3.0-4.0)", color: "#61cdbb" },
            { label: "Highly Relevant (>4.0)", color: "#97e3d5" },
          ],
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemTextColor: colors.grey[100],
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.grey[200],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default BarChart;

