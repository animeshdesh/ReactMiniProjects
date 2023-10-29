/* eslint-disable no-unused-vars */
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CountriesDisplay = () => {
  const URL = "https://restcountries.com/v3.1/all";
  const [Data, setData] = useState([]);
  const getApiData = async () => {
    try {
      const response = await axios.get(URL);
      const receivedData = await response.data;
      setData(receivedData);
      console.log(receivedData);
    } catch (e) {
      console.log(e.response.error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div>
      <Container>
        <Box sx={{ margin: "2rem 0rem 2rem 0rem" }}>
          <Typography variant="h2">Countries</Typography>
        </Box>
        <Typography variant="h4">Total Countries : {Data.length}</Typography>
        <Grid container>
          {Data.map((country, index) => {
            return (
              <Grid
                xs={4}
                md={2}
                key={index}
                sx={{
                  margin: "0.5rem 0rem 0.5rem 0rem",
                  transition: "transform 0.2s", // Add a transition for smooth animation
                  "&:hover": {
                    transform: "scale(1.1)", // Enlarge on hover
                  },
                }}
              >
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  style={{
                    height: "100px",
                    width: "150px",
                    border: "1px solid black",
                  }}
                />
                <Typography>{country.name.common}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default CountriesDisplay;
