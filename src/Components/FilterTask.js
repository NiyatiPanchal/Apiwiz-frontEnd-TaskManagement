import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MyContext } from "../App";

const StyledButton = styled(Button)`
  text-transform: none;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 15px;
  margin: 20px;
`;

const centeredFlexStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

const FilterTask = ({
  taskState,
  setReady,
  setInProgress,
  setTesting,
  setDone,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const { color, darkMode } = useContext(MyContext);

  useEffect(() => {
    const filteredTasks = taskState.filter((task) => {
      return (
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!startDateFilter ||
          task.startDate >=
            new Date(startDateFilter).toISOString().slice(0, 10)) &&
        (!endDateFilter ||
          task.endDate <= new Date(endDateFilter).toISOString().slice(0, 10)) &&
        (!assigneeFilter || task.assignee === assigneeFilter) &&
        (!severityFilter || task.priority === severityFilter)
      );
    });
    const readyTasks = filteredTasks.filter((task) => task.status === "Ready");
    setReady(readyTasks);
    const inProgressTasks = filteredTasks.filter(
      (task) => task.status === "In Progress"
    );
    setInProgress(inProgressTasks);
    const testingTasks = filteredTasks.filter(
      (task) => task.status === "Testing"
    );
    setTesting(testingTasks);
    const doneTasks = filteredTasks.filter((task) => task.status === "Done");
    setDone(doneTasks);
  }, [
    searchTerm,
    startDateFilter,
    endDateFilter,
    assigneeFilter,
    severityFilter,
  ]);

  const resetFields = () => {
    setSearchTerm("");
    setStartDateFilter("");
    setEndDateFilter("");
    setAssigneeFilter("");
    setSeverityFilter("");
  };

  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        style={{
          ...centeredFlexStyle,
        }}
      >
        <TextField
          label="Search by Task Name"
          id="standard-basic"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ input: { color: `${color}` } }}
          inputProps={{
            style: {
              fontFamily: "Varela Round",
              width: "100%",
            },
          }}
          InputLabelProps={{
            style: { fontFamily: "Varela Round", color: `${color}` },
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        style={{
          ...centeredFlexStyle,
        }}
      >
        <TextField
          label="Search Assignee"
          id="standard-basic"
          variant="standard"
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          inputProps={{
            style: {
              fontFamily: "Varela Round",
              width: "100%",
              color: `${color}`,
            },
          }}
          InputLabelProps={{
            style: { fontFamily: "Varela Round", color: `${color}` },
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        style={{
          ...centeredFlexStyle,
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            style={{
              color: `${color}`,
              fontFamily: "Varela Round",
            }}
          >
            Select Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Select Priority"
            name="category"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            sx={{ width: "100%", color: `${color}` }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Urgent" style={{ color: "#E34234" }}>
              Urgent
            </MenuItem>
            <MenuItem value="High" style={{ color: "#CC5500" }}>
              High
            </MenuItem>
            <MenuItem value="Medium" style={{ color: "#0047AB" }}>
              Medium
            </MenuItem>
            <MenuItem value="Low" style={{ color: "#2E8B57" }}>
              Low
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        sx={{ borderBottom: "none" }}
        style={{
          ...centeredFlexStyle,
        }}
      >
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            slotProps={{
              textField: {
                variant: "filled",
                style: {
                  color: `${color}`,
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "Varela Round",
                fontSize: "16px",
                color: `${color}`,
                background: "none",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Varela Round",
                color: `${color}`,
              },
            }}
            label="Start Date"
            variant="inline"
            value={startDateFilter}
            onChange={(newDate) => setStartDateFilter(newDate)}
          />
        </DemoContainer>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        style={{
          ...centeredFlexStyle,
        }}
      >
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            slotProps={{
              textField: {
                variant: "filled",
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "Varela Round",
                fontSize: "16px",
                color: `${color}`,
                background: "none",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Varela Round",
                color: `${color}`,
              },
            }}
            label="End Date"
            variant="inline"
            value={endDateFilter}
            onChange={(newDate) => setEndDateFilter(newDate)}
          />
        </DemoContainer>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        style={{
          ...centeredFlexStyle,
        }}
      >
        <StyledButton
          variant="contained"
          onClick={resetFields}
          style={{
            background: darkMode ? "#fff" : "#000000",
            color: darkMode ? "#000000" : "#fff",
          }}
        >
          Reset
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default FilterTask;
