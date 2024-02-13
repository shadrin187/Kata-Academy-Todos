import PropTypes from 'prop-types'

import Task from '../task/Task';
import './TaskList.css';

function TaskList({
  tasksData,
  onDeleteTask,
  onTaskChange,
  onEditingTask,
  startTimer,
  pauseTimer,
}) {
  const elements = tasksData.map((item) => {
    return (
      <Task
        key={item.id}
        item={item}
        onDeleteTask={onDeleteTask}
        onTaskChange={onTaskChange}
        onEditingTask={onEditingTask}
        pauseTimer={() => pauseTimer(item.id)}
        startTimer={() => startTimer(item.id)}
      />
    );
  })

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  tasksData: PropTypes.any,
  onTaskChange: PropTypes.func.isRequired,
  onEditingTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasksData: {},
};

export default TaskList;
