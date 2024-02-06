import PropTypes from "prop-types";
import "./TasksFilter.css";

function TasksFilter({ changeFilterStatus, filterStatus }) {
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => changeFilterStatus("All")}
          className={filterStatus === "All" ? "selected" : null}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => changeFilterStatus("Active")}
          className={filterStatus === "Active" ? "selected" : null}
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => changeFilterStatus("Completed")}
          className={filterStatus === "Completed" ? "selected" : null}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filterStatus: PropTypes.string,
  changeFilterStatus: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filterStatus: "All",
};

export default TasksFilter;
