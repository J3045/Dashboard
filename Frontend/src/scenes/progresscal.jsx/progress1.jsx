// src/progresscal.jsx/progress1.js
import React, { useEffect, useState } from 'react';

function Progress1() {
  const [top5Sectors, setTop5Sectors] = useState([]);

  useEffect(() => {
    async function fetchDataAndCalculateSectorPercentages() {
      try {
        const response = await fetch('http://localhost:5000/api/data'); // Replace with your actual endpoint
        const data = await response.json();

        // Get the current year and the year 10 years ago
        const currentYear = new Date().getFullYear();
        const tenYearsAgo = currentYear - 10;

        // Initialize a dictionary to hold counts for each sector
        const sectorCounts = {};

        // Filter data for entries added in the last 10 years
        data.forEach(item => {
          const addedYear = new Date(item.added).getFullYear();
          if (addedYear >= tenYearsAgo) {
            // Count entries for each sector
            sectorCounts[item.sector] = (sectorCounts[item.sector] || 0) + 1;
          }
        });

        // Calculate total number of entries in the last 10 years
        const totalEntriesInLast10Years = Object.values(sectorCounts).reduce((sum, count) => sum + count, 0);

        // Calculate percentage for each sector
        const sectorPercentages = {};

        for (const [sector, count] of Object.entries(sectorCounts)) {
          sectorPercentages[sector] = (count / totalEntriesInLast10Years) * 100;
        }

        // Sort sectors by percentage and select the top 5
        const sortedSectors = Object.entries(sectorPercentages).sort(([, percentA], [, percentB]) => percentB - percentA);
        const top5 = sortedSectors.slice(0, 5).map(([sector, percentage]) => ({
          sector,
          percentage: percentage.toFixed(2) // Format percentage to 2 decimal places
        }));

        // Set state with the top 5 sectors
        setTop5Sectors(top5);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchDataAndCalculateSectorPercentages();
  }, []);

  // Return top 5 sectors data
  return top5Sectors;
}

export default Progress1;
