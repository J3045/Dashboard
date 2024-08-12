import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is the purpose of the data visualization dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The data visualization dashboard aims to present key insights from the provided data through interactive graphs, charts, and visuals. It helps users easily understand and analyze important variables such as Intensity, Likelihood, Relevance, and more.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I navigate through different charts and data views?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can navigate through different charts and data views using the sidebar menu. Each menu item represents a different type of chart or data view, such as Bar Chart, Pie Chart, Line Chart, and Geography Chart.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What data is included in the dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The dashboard includes data on various topics such as energy, environment, market trends, and more. Key variables visualized include Intensity, Likelihood, Relevance, Year, Country, Topics, Region, and City.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I filter the data displayed on the dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, the dashboard includes several filters that allow you to refine the data displayed. Filters include end year, topics, sector, region, PEST, source, SWOT, country, city, and more.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;


