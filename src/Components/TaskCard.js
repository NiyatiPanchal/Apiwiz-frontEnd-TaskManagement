import { Box, Grid, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MyContext } from "../App";
import { getBackgroundColor } from "../App";

const Container = styled(Box)`
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
  font-family: "Raleway", sans-serif;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.3s;
  border-top: ${({ priority }) => `15px solid ${getBackgroundColor(priority)}`};
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
  }
`;

const Text = styled(Typography)(({ theme, color }) => ({
  color: `${color}` || theme.palette.text.primary,
  fontSize: "12px",
  fontFamily: "Raleway, sans-serif",
}));

const Heading = styled(Typography)(({ theme, color }) => ({
  color: `${color}` || theme.palette.text.primary,
  fontSize: "18px",
  fontWeight: 600,
  borderRadius: "5px",
  fontFamily: "Raleway, sans-serif",
}));

const Details = styled(Typography)(({ theme, color }) => ({
  fontSize: "14px",
  fontWeight: "bold",
  wordBreak: "break-word",
  marginTop: "15px",
  fontFamily: "Raleway, sans-serif",
  color: `${color}` || theme.palette.text.primary,
}));

const centeredFlexStyle = {
  alignItems: "center",
  display: "flex",
};

const TaskCard = ({ task, index }) => {
  const { color, darkMode, backgroundColor } = useContext(MyContext);
  const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          priority={task.priority}
          backgroundColor={darkMode ? "#141414" : backgroundColor}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} style={{ ...centeredFlexStyle }}>
              <Heading color={color}>{addElipsis(task.name, 20)}</Heading>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                ...centeredFlexStyle,
              }}
            >
              <Text color={color}>{task.assignee}</Text>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Text color={color}>Start Date : {task.startDate}</Text>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                ...centeredFlexStyle,
              }}
            >
              <Text color={color}>Deadline : {task.endDate}</Text>
            </Grid>
          </Grid>
          <Details color={color}>{addElipsis(task.summary, 150)}</Details>

          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

export default TaskCard;
