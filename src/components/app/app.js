import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import './App.css';
import TaskList from '../task-list/TaskList';
import NewTaskForm from '../new-task-form/NewTaskForm';
import Footer from '../footer/footer';

export default function App() {
  const [tasksData, setTaskData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  const onAddTask = (value, minutes, seconds) => {
    const task = {
      id: nanoid(),
      description: value,
      checked: false,
      date: new Date(),
      minutes: Number(minutes),
      seconds: Number(seconds),
      isPaused: false,
    };
    setTaskData([...tasksData, task]);
  };

  const onDeleteTask = (id) => {
    tasksData.filter((task) => task.id !== id);
  };
  setTaskData;

  const onTaskChange = (id, target) => {
    setTaskData(
      tasksData.map((element) => {
        if (id === element.id) {
          element.checked = target;
        }
        return element;
      }),
    );
  };

  const onEditingTask = (id, value) => {
    setTaskData(
      tasksData.map((task) => {
        if (task.id === id) {
          task.description = value;
        }
        return task;
      }),
    );
  };

  const filteredTasks = () => {
    return tasksData.filter(({ checked }) => {
      const all = filterStatus === 'All';
      const completed = filterStatus === 'Completed';
      return all ? true : completed ? checked === true : checked === false;
    });
  };

  const changeFilterStatus = (newFilterStatus) => {
    setFilterStatus(newFilterStatus);
  };

  const onClearCompleted = () => {
    setTaskData(tasksData.filter((task) => !task.checked));
  };

  useEffect(() => {
    let timer = setInterval(updateTimers, 1000)
    return () => clearInterval(timer)
  })

  const updateTimers = () => {
    setTaskData(
      tasksData.map((el) => {
        let time = el.minutes * 60 + el.seconds;
        if (!el.isPaused) {
          time += 1;
        }
        el.minutes = Math.floor(time / 60);
        el.seconds = time % 60;
        return el;
      }),
    );
  };

  const pauseTimer = (id) => {
    setTaskData(
      tasksData.map((el) => {
        if (el.id === id) {
          el.isPaused = true;
        }
        return el;
      }),
    );
  };

  const startTimer = (id) => {
    setTaskData(
      tasksData.map((el) => {
        if (el.id === id) {
          el.isPaused = false;
        }
        return el;
      }),
    );
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onAddTask={onAddTask} />
      </header>
      <section className="main">
        <TaskList
          tasksData={filteredTasks()}
          onDeleteTask={onDeleteTask}
          onTaskChange={onTaskChange}
          onEditingTask={onEditingTask}
          pauseTimer={pauseTimer}
          startTimer={startTimer}
        />
        <Footer
          changeFilterStatus={changeFilterStatus}
          onClearCompleted={onClearCompleted}
          leftTasks={tasksData.filter((item) => !item.checked).length}
          filterStatus={filterStatus}
        />
      </section>
    </section>
  );
}
