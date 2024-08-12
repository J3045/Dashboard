import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from '../theme';

// Function to parse date from 'January, 17 2017 01:51:10' format
const parseDate = (dateString) => {
  if (!dateString) return new Date();

  try {
    // Convert the date string to a Date object
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid Date");
    }
    return parsedDate;
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date(); 
  }
};

// Function to format date into a readable string
const formatDateTime = (dateString) => {
  const parsedDate = parseDate(dateString);
  if (isNaN(parsedDate.getTime())) return 'Invalid Date';

  // Format date as 'MMM d, yyyy hh:mm:ss a'
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  return parsedDate.toLocaleString('en-US', options);
};

const Recent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();

        // Log fetched data to understand its format
        console.log("Fetched raw data:", rawData);

        // Process and sort the topics by their date
        const recentTopics = rawData
          .map(item => ({
            title: item.topic || 'No Title',
            date: item.added || 'Invalid Date', // Assuming 'added' is the correct field
            pestle: item.pestle || 'Unknown PESTLE'
          }))
          .sort((a, b) => parseDate(b.date) - parseDate(a.date)) // Sort by date descending
          .slice(0, 20); // Limit to the latest 20 items

        setTopics(recentTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <Box>
      {topics.map((topic, i) => (
        <Box
          key={`${topic.title}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              {topic.title}
            </Typography>
            <Typography color={colors.grey[100]}>
              {formatDateTime(topic.date)}
            </Typography>
          </Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            {topic.pestle}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Recent;
