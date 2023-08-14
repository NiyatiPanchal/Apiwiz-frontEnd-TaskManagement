import React, { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Box, Grid } from "@mui/material";
import FilterTask from "./FilterTask";
import TaskList from "./TaskList";
import { MyContext } from "../App";

const TaskBoard = ({ tasks }) => {
  const [taskState, setTaskState] = useState(() => tasks);
  const [ready, setReady] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [testing, setTesting] = useState([]);
  const [done, setDone] = useState([]);

  const { backgroundColor, darkMode } = useContext(MyContext);

  useEffect(() => {
    const readyTasks = tasks.filter((task) => task.status === "Ready");
    setReady(readyTasks);
    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    );
    setInProgress(inProgressTasks);
    const testingTasks = tasks.filter((task) => task.status === "Testing");
    setTesting(testingTasks);
    const doneTasks = tasks.filter((task) => task.status === "Done");
    setDone(doneTasks);
    setTaskState(tasks);
  }, [tasks]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY
    switch (source.droppableId) {
      case "1":
        setReady(removeItemById(draggableId, ready));
        break;
      case "2":
        setInProgress(removeItemById(draggableId, inProgress));
        break;
      case "3":
        setTesting(removeItemById(draggableId, testing));
        break;
      case "4":
        setDone(removeItemById(draggableId, done));
        break;
    }

    // GET ITEM
    const updatedTasks = [...taskState];
    const task = findItemById(draggableId, updatedTasks);
    const taskIndex = updatedTasks.findIndex((task) => task.id == draggableId);

    //ADD ITEM
    switch (destination.droppableId) {
      case "1":
        setReady((prevReady) => {
          const newReady = [...prevReady];
          newReady.splice(destination.index, 0, { ...task, status: "Ready" });
          return newReady;
        });
        updatedTasks[taskIndex].status = "Ready";
        setTaskState(updatedTasks);
        break;
      case "2":
        setInProgress((prevInProgress) => {
          const newInProgress = [...prevInProgress];
          newInProgress.splice(destination.index, 0, {
            ...task,
            status: "In Progress",
          });
          return newInProgress;
        });
        updatedTasks[taskIndex].status = "In Progress";
        setTaskState(updatedTasks);
        break;
      case "3":
        setTesting((prevTesting) => {
          const newTesting = [...prevTesting];
          newTesting.splice(destination.index, 0, {
            ...task,
            status: "Testing",
          });
          return newTesting;
        });
        updatedTasks[taskIndex].status = "Testing";
        setTaskState(updatedTasks);
        break;
      case "4":
        setDone((prevDone) => {
          const newDone = [...prevDone];
          newDone.splice(destination.index, 0, { ...task, status: "Done" });
          return newDone;
        });
        updatedTasks[taskIndex].status = "Done";
        setTaskState(updatedTasks);
        break;
    }
  };
  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }
  return (
    <Box
      style={{
        background: `${backgroundColor}`,
        margin: 0,
        minHeight: "100vh",
      }}
    >
      <Box style={{ marginBottom: 40 }}>
        <FilterTask
          taskState={taskState}
          setReady={setReady}
          setInProgress={setInProgress}
          setTesting={setTesting}
          setDone={setDone}
        />
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          <TaskList
            title="Ready"
            tasklist={ready}
            id="1"
            backgroundColor={darkMode ? "darkslategray" : backgroundColor}
          />
          <TaskList
            title="In Progress"
            tasklist={inProgress}
            id="2"
            backgroundColor={darkMode ? "darkslategray" : backgroundColor}
          />
          <TaskList
            title="Testing"
            tasklist={testing}
            id="3"
            backgroundColor={darkMode ? "darkslategray" : backgroundColor}
          />
          <TaskList
            title="Done"
            tasklist={done}
            id="4"
            backgroundColor={darkMode ? "darkslategray" : backgroundColor}
          />
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default TaskBoard;
