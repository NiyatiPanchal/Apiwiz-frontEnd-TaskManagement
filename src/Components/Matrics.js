import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Box, Grid, Typography, styled } from "@mui/material";
import { MyContext, getBackgroundColor } from "../App";

const InfoBox = styled(Box)`
  margin-bottom: 100px;
  font-family: "Raleway", sans-serif;
`;

const Info = styled(Typography)(({ theme, color }) => ({
  textAlign: "center",
  fontWeight: 600,
  color: `${color}` || theme.palette.text.primary,
  fontFamily: "Raleway, sans-serif",
}));

const Matrics = ({ tasks }) => {
  const [metricsData, setMetricsData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [totalAssignee, setTotalAssignee] = useState(0);
  const [totalEffortSpent, setTotalEffortSpent] = useState(
    tasks.reduce((accumulator, task) => accumulator + task.effortSpent, 0)
  );

  const { color, backgroundColor } = useContext(MyContext);

  useEffect(() => {
    getTotalData();
    getMatricsData();
    getPieData();
  }, [tasks]);

  const getMatricsData = () => {
    if (tasks.length > 0) {
      const status = ["Ready", "In Progress", "Testing", "Done"];
      const tasksByPriority = {
        Low: [],
        Medium: [],
        High: [],
        Urgent: [],
      };

      tasks.forEach((task) => {
        tasksByPriority[task.priority].push(task);
      });

      const statusData = {
        labels: status,
        datasets: [],
      };

      Object.keys(tasksByPriority).forEach((priority) => {
        const taskCountByStatus = status.map((s) => {
          const tasksInStatus = tasksByPriority[priority].filter(
            (task) => task.status === s
          );
          return tasksInStatus.length;
        });

        statusData.datasets.push({
          label: priority,
          data: taskCountByStatus,
          backgroundColor: getBackgroundColor(priority),
        });
      });

      setMetricsData(statusData);
    }
  };

  const getPieData = () => {
    // Calculate the total effort spent on tasks by stage
    const effortByStage = {
      Ready: 0,
      "In Progress": 0,
      Testing: 0,
      Done: 0,
    };
    tasks.forEach((task) => {
      effortByStage[task.status] += task.effortSpent;
    });

    // Prepare data for the pie chart
    const pieChartData = {
      labels: Object.keys(effortByStage),
      datasets: [
        {
          label: "Effort Spent",
          data: Object.values(effortByStage),
          backgroundColor: [
            "#E34234", // Red for Ready
            "#DAA520", // Yellow for In Progrss
            "#0047AB", // Blue for Testing
            "#2E8B57", // Green for Done
          ],
        },
      ],
    };
    setPieData(pieChartData);
  };

  const getTotalData = () => {
    const uniqueAssignees = new Set();
    tasks.forEach((task) => {
      uniqueAssignees.add(task.assignee);
    });
    setTotalAssignee(uniqueAssignees.size);
  };

  return (
    <Box style={{ backgroundColor: `${backgroundColor}`, minHeight: "100vh" }}>
      <InfoBox>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4} style={{ color: `${color}` }}>
            <Info color={color}>Total Tasks: {tasks.length}</Info>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Info color={color}>Total People Involved: {totalAssignee}</Info>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Info color={color}>Total Effort Spent: {totalEffortSpent}</Info>
          </Grid>
        </Grid>
      </InfoBox>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          sm={6}
          container
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: 300 }}
        >
          {/* <Grid container justifyContent="center" alignItems="center"> */}
          {metricsData && (
            <Bar
              data={metricsData}
              options={{
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
              style={{
                width: "100%",
              }}
            />
          )}
          <Info color={color}>Bar Diagram for Number of Task to Status</Info>
          {/* </Grid> */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: 300 }}
        >
          {/* <Grid container justifyContent="center" alignItems="center"> */}
          {pieData && (
            <Pie
              data={pieData}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                maintainAspectRatio: false,
                aspectRatio: 1,
              }}
              // style={{
              //   width: "100%",
              //   height: 400,
              // }}
              height="300px"
              width="300px"
            />
          )}
          <Info color={color}>Pie Chart for Total Effort based on Status</Info>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Matrics;
