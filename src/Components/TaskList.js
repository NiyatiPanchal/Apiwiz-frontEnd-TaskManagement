import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { MyContext } from "../App";

const ColumnName = styled(Typography)(({ theme, color }) => ({
  color: `${color}` || theme.palette.text.primary,
  fontFamily: "Varela Round",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const TaskList = ({ title, tasklist, id }) => {
  const { color } = useContext(MyContext);
  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <Droppable droppableId={`${id}`}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <ColumnName color={`${color}`}>{title}</ColumnName>
            <Divider
              style={{ borderTop: `3px solid ${color}`, marginBottom: 30 }}
            />
            {tasklist.map((task, index) => (
              <TaskCard task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Grid>
  );
};

export default TaskList;
