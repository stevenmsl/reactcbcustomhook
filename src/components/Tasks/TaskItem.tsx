import * as React from "react";
import classes from "./TaskItem.module.css";

type TaskItemProps = {
  children?: React.ReactNode;
};

const TaskItem: React.FC<TaskItemProps> = ({ children }) => {
  return <li className={classes.task}>{children}</li>;
};

export default TaskItem;
