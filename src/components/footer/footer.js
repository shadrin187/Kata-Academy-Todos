import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/TasksFilter'
import './Footer.css'

function Footer({
  onClearCompleted,
  leftTasks,
  changeFilterStatus,
  filterStatus,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{leftTasks} items left</span>
      <TasksFilter
        changeFilterStatus={changeFilterStatus}
        filterStatus={filterStatus}
      />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  leftTasks: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  changeFilterStatus: PropTypes.func.isRequired,
  filterStatus: PropTypes.string,
};

Footer.defaultProps = {
  filterStatus: 'All',
};

export default Footer;
