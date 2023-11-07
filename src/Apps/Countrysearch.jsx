import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleCountry from "./SingleCountry";
const Countrysearch = () => {
  const URL = "https://restcountries.com/v3.1/all";
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  useEffect(() => {
    const filteredCountries = Data.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  }, [search, Data]);

  const openModal = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCountry(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Container>
        <Box sx={{ margin: "2rem 0rem 2rem 0rem" }}>
          <Typography variant="h2">Countries</Typography>
        </Box>
        <Typography variant="h4">Total Countries : {Data.length}</Typography>
        <TextField
          sx={{ margin: "2rem 0rem 2rem 0rem" }}
          id="outlined-basic"
          label="Search For any Country"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Grid container>
          {filteredCountries.map((country, index) => {
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
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(country)}
                />
                <Typography variant="h6">{country.name.common}</Typography>
              </Grid>
            );
          })}
          {isModalOpen && selectedCountry && (
            <div
              style={{
                position: "fixed", // Fixed position to overlay on top of content
                top: 0, // Position from top
                left: 0, // Position from left
                width: "100%", // Cover the entire width
                height: "100%", // Cover the entire height
                backgroundColor: "white", // Semi-transparent black overlay
                zIndex: 10, // Ensure it's on top of the content
              }}
            >
              <div>
                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "10px",
                    fontSize: "75px",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={closeModal}
                >
                  &times;
                </span>
                {/* <h2>{selectedCountry?.name?.common}</h2>
                <p>Capital: {selectedCountry?.capital}</p>
                <p>Population: {selectedCountry?.population}</p> */}
                <Container sx={{ margin: "1.5rem 1.5rem" }}>
                  <Box sx={{ display: "flex" }}>
                    <img
                      src={selectedCountry.flags.png}
                      alt={selectedCountry.flags.alt}
                      style={{
                        height: "100px",
                        width: "150px",
                        border: "1px solid black",
                      }}
                    />
                    <Box>
                      <Typography variant="h2" sx={{ marginLeft: "1.5rem" }}>
                        {selectedCountry.name.common}
                      </Typography>
                      <Typography variant="h5" sx={{ marginLeft: "1.5rem" }}>
                        Capital City: {selectedCountry.capital}
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </Container>
              </div>
            </div>
          )}
        </Grid>
      </Container>
      <div></div>
    </div>
  );
};

export default Countrysearch;
/* eslint-disable no-unused-vars */
