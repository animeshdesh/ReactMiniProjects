import { Box, Container, Typography } from "@mui/material";
import { useRef, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
        <Typography variant="h2">Stop Watch</Typography>
        <Box
          sx={{
            height: "20rem",
            width: "50%",
            border: "2px solid black",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography variant="h3">
            <p>Timer : {formatTime(elapsedTime)}</p>
          </Typography>
          <Box>
            <button onClick={startStopwatch}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetStopwatch}>Reset</button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Stopwatch;
