import { Task } from "./components/types";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";
import { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, error, getTasksHttp] = useHttp();

  /* you will receive a big object with each record's id being 
       one of its properties 
  */
  const convert = (obj: any) => {
    const converted: Task[] = [];
    for (const key in obj) converted.push({ id: key, text: obj[key].text });
    setTasks(converted);
  };

  /* load the tasks initially  */
  useEffect(() => {
    getTasksHttp(
      {
        url: "https://react-custom-hooks-d237a-default-rtdb.firebaseio.com/tasks.json",
      },
      convert
    );
  }, [getTasksHttp]);

  const taskAddHandler = (task: Task) => {
    /* how to access the previous state */
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const fetchHandler = () => {
    getTasksHttp(
      {
        url: "https://react-custom-hooks-d237a-default-rtdb.firebaseio.com/tasks.json",
      },
      convert
    );
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onFetch={fetchHandler}
      />
    </>
  );
}

export default App;
