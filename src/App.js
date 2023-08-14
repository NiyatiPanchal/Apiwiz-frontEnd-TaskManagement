import React, { createContext, useEffect, useState } from "react";
import TaskBoard from "./Components/TaskBoard";
import Matrics from "./Components/Matrics";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const MyContext = createContext();

const Label = styled(Typography)`
  font-size: 60px;
  font-family: "Varela Round", sans-serif;
  font-weight: bold;
`;

export const getBackgroundColor = (priority) => {
  switch (priority) {
    case "Urgent":
      return "#E34234"; // Red
    case "High":
      return "#CC5500"; // Orange
    case "Medium":
      return "#0047AB"; // Blue
    case "Low":
      return "#2E8B57"; // Green
    default:
      return "rgba(0, 0, 0, 0.6)"; // Black
  }
};

function App() {
  const [selectedValue, setSelectedValue] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    // API Call
    const response = await fetch("https://gcp-mock.apiwiz.io/v1/tasks", {
      method: "GET",
      headers: {
        "x-tenant": "b4349714-47c7-4605-a81c-df509fc7e653",
      },
    });
    const json = await response.json();
    setTasks(json);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MyContext.Provider
        value={{
          darkMode,
          color: darkMode ? "#FFF5EE" : "black",
          backgroundColor: darkMode ? "#282828" : "#f5f5f5",
        }}
      >
        <Box style={{ margin: 0 }}>
          <Box
            style={{
              padding: "0px 0px 20px 0px",
              backgroundColor: darkMode ? "#141414" : "#F5F5F5",
              color: darkMode ? "#FFF5EE" : "#00000",
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Label style={{ color: darkMode ? "#FFF5EE" : "#000000" }}>
                  Task Manager
                </Label>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                justifyContent="center"
                alignItems="center"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ color: darkMode ? "#FFF5EE" : "#000000" }}
                >
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{
                      color: darkMode ? "#FFF5EE" : "#000000",
                      fontFamily: "Varela Round",
                    }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Category"
                    name="category"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    style={{
                      color: darkMode ? "#FFF5EE" : "#000000",
                      fontFamily: "Varela Round",
                    }}
                  >
                    <MenuItem
                      value="board"
                      style={{
                        color: darkMode ? "#FFF5EE" : "#000000",
                        backgroundColor: darkMode ? "#0C0C1E" : "#f5f5f5",
                        fontFamily: "Varela Round",
                      }}
                    >
                      Board
                    </MenuItem>
                    <MenuItem
                      value="matrics"
                      style={{
                        color: darkMode ? "#FFF5EE" : "#000000",
                        backgroundColor: darkMode ? "#0C0C1E" : "#f5f5f5",
                        fontFamily: "Varela Round",
                      }}
                    >
                      Matrics
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Dark Mode"
                    sx={{
                      color: darkMode ? "#FFF5EE" : "#000000",
                      fontFamily: "Varela Round",
                      fontWeight: 600,
                    }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Box>

          {selectedValue === "board" ? (
            <TaskBoard tasks={tasks} />
          ) : (
            <Matrics tasks={tasks} />
          )}
        </Box>
      </MyContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
