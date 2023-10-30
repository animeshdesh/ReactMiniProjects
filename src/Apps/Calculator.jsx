import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";

const Calculator = () => {
  const numArray = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "C",
    "0",
    "=",
    "/",
  ];

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const calculateResult = () => {
    try {
      const calculatedResult = eval(input);
      setResult(calculatedResult);
    } catch (e) {
      setResult(e);
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };
  const handelInput = (number) => {
    if (number === "=") {
      calculateResult();
    } else if (number === "C") {
      clearInput();
    } else {
      setInput((prev) => prev + number);
    }
  };
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2">Calculator</Typography>
        <input value={input}></input>
        <Typography>Result : {result || "0"}</Typography>
        <Box
          sx={{
            border: "1px solid black",
            height: "20rem",
            width: "50%",
            borderRadius: "20px",
          }}
        >
          <Grid container spacing={2}>
            {numArray.map((num, i) => (
              <Grid
                item
                key={i}
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <button
                  style={{
                    color: "black", // Set the text color
                    padding: "8px 16px", // Add padding
                    borderRadius: "8px", // Add border radius
                    border: "1px solid black", // Remove border
                    cursor: "pointer",
                    width: "50px", // Add a pointer cursor
                  }}
                  onClick={() => handelInput(num)}
                >
                  {num}
                </button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Calculator;
