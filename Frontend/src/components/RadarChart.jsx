import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { ResponsiveChord } from '@nivo/chord';
import { tokens } from '../theme';

const ChordChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch("http://localhost:5000/api/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
  
        const processedData = prepareData(rawData);
             setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  const prepareData = (data) => {
    if (!data || data.length === 0) return { matrix: [], keys: [], labels: [] };

    const regions = [...new Set(data.flatMap(item => [item.region, item.targetRegion]))];

    const matrix = Array.from({ length: regions.length }, () => Array(regions.length).fill(0));

    data.forEach(item => {
      const from = regions.indexOf(item.region);
      const to = regions.indexOf(item.targetRegion); // Assume targetRegion exists
      if (from !== -1 && to !== -1) {
        const likelihood = item.likelihood && !isNaN(item.likelihood) ? item.likelihood : 1;
        matrix[from][to] += likelihood; // Use item.likelihood or a default value
      }
    });

    // Shorten region names for labels
    const shortenLabel = (label) => {
      if (typeof label === 'string' && label.length > 10) {
        return `${label.substring(0, 7)}...`; // Adjust the length as needed
      }
      return label || 'Other'; // Provide a default value if label is undefined
    };

    const shortenedLabels = regions.map(shortenLabel);

    return {
      matrix,
      keys: regions,
      labels: shortenedLabels
    };
  };

  if (loading) {
    return <p>Loading data...</p>; // Show loading until data is available
  }

  if (error) {
    return <p>Error loading data: {error}</p>; // Show error message if any
  }

  if (!data || data.matrix.length === 0) {
    return <p>No data available</p>; // Handle case where no data is available
  }

  return (
    <div style={{ height: '600px' }}>
      <ResponsiveChord
        data={data.matrix}
        keys={data.keys}
        margin={{ top: 50, right: 40, bottom: 80, left: 80 }}
        colors={{ scheme: 'nivo' }} // Use Nivo's color scheme
        padAngle={0.1}
        innerRadius={0.3}
        arcBorderWidth={1}
        arcBorderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        ribbonBorderWidth={1}
        ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableLabel={true} // Enable labels around the chart
        labelRotation={-45}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
          tooltip: {
            container: {
              background: colors.grey[800],
              color: colors.grey[100],
            },
          },
        }}
      />
    </div>
  );
};

export default ChordChart;
