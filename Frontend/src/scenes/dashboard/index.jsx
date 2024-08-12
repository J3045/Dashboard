// import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import PieChart from "../../components/PieChart";



// const Dashboard = () => {

//   async function fetchDataAndCalculateTop4Topics() {
//     try {
//       const response = await fetch('http://localhost:5000/api/data'); 
//       const data = await response.json();
  
//       console.log("ok");
  
//       const currentYear = new Date().getFullYear();
//       const tenYearsAgo = currentYear - 10;
  
//       const topicCounts = {};
  
//       data.forEach(item => {
//         const addedYear = new Date(item.added).getFullYear();
//         if (addedYear >= tenYearsAgo) {
//           if (topicCounts[item.topic]) {
//             topicCounts[item.topic]++;
//           } else {
//             topicCounts[item.topic] = 1;
//           }
//         }
//       });
  
//       const totalEntriesInLast10Years = Object.values(topicCounts).reduce((sum, count) => sum + count, 0);
//       const topicPercentages = {};
  
//       for (const [topic, count] of Object.entries(topicCounts)) {
//         topicPercentages[topic] = (count / totalEntriesInLast10Years);
//       }
  
//       const sortedTopics = Object.entries(topicPercentages).sort(([, percentA], [, percentB]) => percentB - percentA);
//       const top4TopicsArray = sortedTopics.slice(0, 5); // Get top 5 topics
  
//       // Convert array to an object
//       const top4Topics = top4TopicsArray.reduce((obj, [topic, percentage]) => {
//         obj[topic] = percentage;
//         return obj;
//       }, {});
  
//       console.log('Top 4 Topics in Last 10 Years:', top4Topics);
  
//       // Convert the object to an array to access specific indices
//       const top4TopicsArrayWithIndex = Object.entries(top4Topics);
  
//       // Access specific elements
//       const firstElement = top4TopicsArrayWithIndex[0];
//       const thirdElement = top4TopicsArrayWithIndex[2];
//       const fourthElement = top4TopicsArrayWithIndex[3];
//       const fifthElement = top4TopicsArrayWithIndex[4]; // Note: This will be `undefined` if there are only 4 elements
  
//       console.log('1st Element:', firstElement ? `Key: ${firstElement[0]}, Value: ${firstElement[1]}` : 'No 1st Element');
//       console.log('3rd Element:', thirdElement ? `Key: ${thirdElement[0]}, Value: ${thirdElement[1]}` : 'No 3rd Element');
//       console.log('4th Element:', fourthElement ? `Key: ${fourthElement[0]}, Value: ${fourthElement[1]}` : 'No 4th Element');
//       console.log('5th Element:', fifthElement ? `Key: ${fifthElement[0]}, Value: ${fifthElement[1]}` : 'No 5th Element');
  
//       return {
//         totalEntriesInLast10Years,
//         top4Topics
//       };
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return null;
//     }
//   }
  
//   // Example usage
//   fetchDataAndCalculateTop4Topics()
//     .then(results => {
//       if (results) {
//         console.log('Total Entries in Last 10 Years:', results.totalEntriesInLast10Years);
//         console.log('Top 4 Topics:', results.top4Topics);
//       }
//     })
//     .catch(error => {
//       console.error('Error in fetch operation:', error);
//     });
  
  






//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="20px">
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

//         <Box>
//           <Button
//             sx={{
//               backgroundColor: colors.blueAccent[700],
//               color: colors.grey[100],
//               fontSize: "14px",
//               fontWeight: "bold",
//               padding: "10px 20px",
//             }}
//           >
//             <DownloadOutlinedIcon sx={{ mr: "10px" }} />
//             Download Reports
//           </Button>
//         </Box>
//       </Box>

//       {/* GRID & CHARTS */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="12,361"
//             subtitle={firstElement[0]}
//             progress={firstElement[1]}
//             increase="+14%"
//             icon={
//               <EmailIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="431,225"
//             subtitle={thirdElement[0]}
//             progress={thirdElement[1]}
//             increase="+15%"
//             icon={
//               <PointOfSaleIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="32,441"
//             subtitle={fourthElement[0]}
//             progress={fourthElement[1]}
//             increase="+5%"
//             icon={
//               <PersonAddIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="1,325,134"
//             subtitle={fifthElement[0]}
//             progress={fifthElement[1]}
//             increase="+43%"
//             icon={
//               <TrafficIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>

//         {/* ROW 2 */}
//         <Box
//           gridColumn="span 8"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Box
//             mt="25px"
//             p="0 30px"
//             display="flex "
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <Typography
//                 variant="h5"
//                 fontWeight="600"
//                 color={colors.grey[100]}
//               >
//                 Revenue Generated
//               </Typography>
//               <Typography
//                 variant="h3"
//                 fontWeight="bold"
//                 color={colors.greenAccent[500]}
//               >
//                 $59,342.32
//               </Typography>
//             </Box>
//             <Box>
//               <IconButton>
//                 <DownloadOutlinedIcon
//                   sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
//                 />
//               </IconButton>
//             </Box>
//           </Box>
//           <Box height="250px" m="-20px 0 0 0">
//             <LineChart isDashboard={true} />
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           overflow="auto"
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             borderBottom={`4px solid ${colors.primary[500]}`}
//             colors={colors.grey[100]}
//             p="15px"
//           >
//             <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
//               Recent Transactions
//             </Typography>
//           </Box>
//           {mockTransactions.map((transaction, i) => (
//             <Box
//               key={`${transaction.txId}-${i}`}
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               borderBottom={`4px solid ${colors.primary[500]}`}
//               p="15px"
//             >
//               <Box>
//                 <Typography
//                   color={colors.greenAccent[500]}
//                   variant="h5"
//                   fontWeight="600"
//                 >
//                   {transaction.txId}
//                 </Typography>
//                 <Typography color={colors.grey[100]}>
//                   {transaction.user}
//                 </Typography>
//               </Box>
//               <Box color={colors.grey[100]}>{transaction.date}</Box>
//               <Box
//                 backgroundColor={colors.greenAccent[500]}
//                 p="5px 10px"
//                 borderRadius="4px"
//               >
//                 ${transaction.cost}
//               </Box>
//             </Box>
//           ))}
//         </Box>

//         {/* ROW 3 */}
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           p="30px"
//         >
//           <Typography variant="h5" fontWeight="600">
//             Campaign
//           </Typography>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             mt="25px"
//           >
//             
//             <Typography
//               variant="h5"
//               color={colors.greenAccent[500]}
//               sx={{ mt: "15px" }}
//             >
//               $48,352 revenue generated
//             </Typography>
//             <Typography>Includes extra misc expenditures and costs</Typography>
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ padding: "30px 30px 0 30px" }}
//           >
//             Relavance 
//           </Typography>
//           <Box height="300px" width="520px" mt="-20px">
//             <BarChart isDashboard={true} />
//           </Box>
//         </Box>
        
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           padding="30px"
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ marginBottom: "15px" }}
//           >
//             Geography Based Traffic
//           </Typography>
//           <Box height="200px">
//             <GeographyChart isDashboard={true} />
//           </Box>
//         </Box>
//   {/* ROW 3 */}
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           p="30px"
//         >
//           <Typography variant="h5" fontWeight="600">
//             Campaign
//           </Typography>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             mt="25px"
//           >
//             <ProgressCircle size="125" />
//             <Typography
//               variant="h5"
//               color={colors.greenAccent[500]}
//               sx={{ mt: "15px" }}
//             >
//               $48,352 revenue generated
//             </Typography>
//             <Typography>Includes extra misc expenditures and costs</Typography>
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ padding: "30px 30px 0 30px" }}
//           >
//             Relavance 
//           </Typography>
//           <Box height="300px" width="520px" mt="-20px">
//             <BarChart isDashboard={true} />
//           </Box>
//         </Box>
      
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           padding="30px"
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ marginBottom: "15px" }}
//           >
//             Geography Based Traffic
//           </Typography>
//           <Box height="200px">
//             <GeographyChart isDashboard={true} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import RadarChart from '../../components/RadarChart';
import Recent from '../../components/Recent';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [topTopics, setTopTopics] = useState({});
  const [totalEntries, setTotalEntries] = useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    async function fetchDataAndCalculateTop4Topics() {
      try {
        const response = await fetch('http://localhost:5000/api/data'); 
        const data = await response.json();
    
        const currentYear = new Date().getFullYear();
        const tenYearsAgo = currentYear - 10;
    
        const topicCounts = {};
    
        data.forEach(item => {
          const addedYear = new Date(item.added).getFullYear();
          if (addedYear >= tenYearsAgo) {
            if (topicCounts[item.topic]) {
              topicCounts[item.topic]++;
            } else {
              topicCounts[item.topic] = 1;
            }
          }
        });
    
        const totalEntriesInLast10Years = Object.values(topicCounts).reduce((sum, count) => sum + count, 0);
        const topicPercentages = {};
    
        for (const [topic, count] of Object.entries(topicCounts)) {
          topicPercentages[topic] = (count / totalEntriesInLast10Years);
        }
    
        const sortedTopics = Object.entries(topicPercentages).sort(([, percentA], [, percentB]) => percentB - percentA);
        const top4TopicsArray = sortedTopics.slice(0, 5); // Get top 5 topics
    
        // Convert array to an object
        const top4Topics = top4TopicsArray.reduce((obj, [topic, percentage]) => {
          obj[topic] = percentage;
          return obj;
        }, {});
    
        setTopTopics(top4Topics);
        setTotalEntries(totalEntriesInLast10Years);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchDataAndCalculateTop4Topics();
  }, []);

  const getIconByIndex = (index) => {
    switch (index) {
      case 0:
        return <LocalGasStationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />;
      case 1:
        return <LocalFireDepartmentIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />;
      case 2:
        return <TrendingUpIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />;
      case 3:
        return <BatteryChargingFullIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />;
      default:
        return <LocalGasStationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />;
    }
  };

  const selectedTopics = Object.entries(topTopics).filter((_, index) => [0, 2, 3, 4].includes(index));

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {selectedTopics.map(([topic, percentage], index) => (
          <Box
            key={index}
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`${Math.round(percentage * totalEntries)}`}
              subtitle={topic}
              progress={percentage}
              increase={`${Math.round(percentage * 100)}%`}
              icon={getIconByIndex(index)}
            />
          </Box>
        ))}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Added
            </Typography>
          </Box>
          {/* {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
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
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))} */}

           {/* This is where i have to add the code */}
          <Recent/>

        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Relevance
          </Typography>
          <Box height="300px" width="520px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>


        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Sector Contribution
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/* <ProgressCircle size="125" /> */}
           < Box height="300px" width="560px" mt="-90px" ml="0px">
            <PieChart isDashboard={true}/>
            </Box>
            {/* <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Regional Likelihood Matrix
          </Typography>
          <Box height="300px" width="360px" mt="-100px" ml="130px">
            <RadarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}


      </Box>
    </Box>




  );
};

export default Dashboard;
