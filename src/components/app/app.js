import { Component } from 'react';
import { nanoid } from 'nanoid';

import './App.css';
import TaskList from '../task-list/TaskList';
import NewTaskForm from '../new-task-form/NewTaskForm';
import Footer from '../footer/footer';

export default class App extends Component {
  state = {
    tasksData: [],
    filterStatus: 'All',
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTimers, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onAddTask = (value, minutes, seconds) => {
    const task = {
      id: nanoid(),
      description: value,
      checked: false,
      date: new Date(),
      minutes: Number(minutes),
      seconds: Number(seconds),
      isPaused: false,
    };
    this.setState(({ tasksData }) => ({
      tasksData: [...tasksData, task],
    }));
  };

  onDeleteTask = (id) => {
    this.setState(({ tasksData }) => {
      const newArray = tasksData.filter((task) => task.id !== id);
      return { tasksData: newArray };
    });
  };

  onTaskChange = (id, target) => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((element) => {
        if (id === element.id) {
          element.checked = target;
        }
        return element;
      }),
    }));
  };

  onEditingTask = (id, value) => {
    this.setState(({ tasksData }) => {
      const newArray = tasksData.map((task) => {
        if (task.id === id) {
          task.description = value;
        }
        return task;
      });
      return { tasksData: newArray };
    });
  };

  filteredTasks = () => {
    const { tasksData, filterStatus } = this.state;
    return tasksData.filter(({ checked }) => {
      const all = filterStatus === 'All';
      const completed = filterStatus === 'Completed';
      return all ? true : completed ? checked === true : checked === false;
    });
  };

  changeFilterStatus = (newFilterStatus) => {
    this.setState({ filterStatus: newFilterStatus });
  };

  onClearCompleted = () => {
    this.setState(({ tasksData }) => {
      const newArray = tasksData.filter((task) => !task.checked);
      return { tasksData: newArray };
    });
  };

  updateTimers = () => {
    this.setState({
      tasksData: this.state.tasksData.map((el) => {
        let time = el.minutes * 60 + el.seconds;
        if (!el.isPaused) {
          time += 1;
        }
        el.minutes = Math.floor(time / 60);
        el.seconds = time % 60;
        return el;
      }),
    });
  };

  pauseTimer = (id) => {
    this.setState({
      tasksData: this.state.tasksData.map((el) => {
        if (el.id === id) {
          el.isPaused = true
        }
        return el
      }),
    })
  };

  startTimer = (id) => {
    this.setState({
      tasksData: this.state.tasksData.map((el) => {
        if (el.id === id) {
          el.isPaused = false
        }
        return el
      }),
    })
  };

  render() {
    const { tasksData } = this.state;

    const leftTasks = tasksData.filter((item) => !item.checked).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasksData={this.filteredTasks()}
            onDeleteTask={this.onDeleteTask}
            onTaskChange={this.onTaskChange}
            onEditingTask={this.onEditingTask}
            pauseTimer={this.pauseTimer}
            startTimer={this.startTimer}
          />
          <Footer
            changeFilterStatus={this.changeFilterStatus}
            onClearCompleted={this.onClearCompleted}
            leftTasks={leftTasks}
            filterStatus={this.state.filterStatus}
          />
        </section>
      </section>
    );
  }
}
