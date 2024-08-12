import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js for using it with React
import axios from 'axios';

// Define a sampling function
const sampleData = (data, interval) => {
  return data.filter((_, index) => index % interval === 0);
};

const LineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const fetchedData = response.data;
        console.log('Fetched Data:', fetchedData);
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Sample data to reduce the number of points
  const sampledData = sampleData(data, 10); // Adjust sampling interval as needed
  const labels = sampledData.map(item => item.Year); // Adjust field names based on your data
  const values = sampledData.map(item => item.Intensity); // Adjust field names based on your data

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Intensity Over Years',
        data: values,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Intensity: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        title: {
          display: true,
          text: 'Intensity'
        }
      }
    },
    elements: {
      point: {
        radius: 2
      }
    }
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
