import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";
import { Task } from "../types";

type TasksProps = {
  tasks: Task[];
  error: Error | undefined;
  onFetch: () => void;
  isLoading: boolean;
};

const Tasks: React.FC<TasksProps> = ({ tasks, error, onFetch, isLoading }) => {
  let content = <h2>No tasks found.</h2>;
  if (tasks && tasks.length > 0) {
    content = (
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  if (error) content = <button onClick={onFetch}>Try again</button>;
  if (isLoading) content = <p>Loading tasks...</p>;

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
