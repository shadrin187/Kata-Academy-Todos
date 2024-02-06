import PropTypes from 'prop-types';
import Task from '../task/Task';
import './TaskList.css';

function TaskList({ tasksData, onDeleteTask, onTaskChange, onEditingTask }) {
  const elements = tasksData.map((item) => {
    return (
      <Task
        key={item.id}
        item={item}
        onDeleteTask={onDeleteTask}
        onTaskChange={onTaskChange}
        onEditingTask={onEditingTask}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  tasksData: PropTypes.any,
  onTaskChange: PropTypes.func.isRequired,
  onEditingTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasksData: {},
};

export default TaskList;
