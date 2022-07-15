import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";
import { Task } from "../types";

type NewTaskProps = {
  onAddTask: (task: Task) => void;
};

const NewTask: React.FC<NewTaskProps> = ({ onAddTask }) => {
  const [isLoading, error, addTask] = useHttp();

  const createTask = (text: string, data: any) => {
    const task: Task = { id: data.name, text };
    /* notify parent */
    onAddTask(task);
  };

  const enterTaskHandler = async (text: string) => {
    addTask(
      {
        url: "https://react-custom-hooks-d237a-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text },
      },
      /* pre-config the text parameter so it can comply with the useHttp spec */
      createTask.bind(null, text)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error.message}</p>}
    </Section>
  );
};

export default NewTask;
