import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

class Task extends Component {
  state = {
    editing: false,
    value: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      onEditingTask,
      item: { id },
    } = this.props;
    onEditingTask(id, this.state.value);
    this.setState({ value: '' });
    this.setState({ editing: false });
  }

  render() {
    const { item, onDeleteTask, onTaskChange, startTimer, pauseTimer } =
      this.props
    const { id, description, checked, date, minutes, seconds } = item;

    let timer = `${minutes}:`
    if (String(seconds).length === 1) {
      timer += `0${seconds}`
    } else {
      timer += seconds
    }

    return (
      <li
        className={
          checked ? 'completed' : this.state.editing ? 'editing' : null
        }
      >
        <div className="view">
          <input
            className="toggle"
            id={id}
            checked={checked}
            type="checkbox"
            onChange={(e) => onTaskChange(id, e.target.checked)}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>

            <span className="description">
              <button
                className="icon icon-play"
                onClick={(e) => {
                  e.stopPropagation()
                  startTimer()
                }}
                id={id}
              />
              <button
                className="icon icon-pause"
                onClick={(e) => {
                  e.stopPropagation()
                  pauseTimer()
                }}
                id={id}
              />
              {timer}
            </span>

            <span className="description">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: this.props.item.description,
              }))
            }
          />
          <button
            className="icon icon-destroy"
            onClick={() => onDeleteTask(id)}
          />
        </div>
        {this.state.editing && (
          <form onSubmit={this.onSubmit}>
            <input
              onChange={(e) => this.setState({ value: e.target.value })}
              type="text"
              className="edit"
              value={this.state.value}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
  onDeleteTask: PropTypes.func.isRequired,
  onTaskChange: PropTypes.func.isRequired,
  onEditingTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};

Task.defaultProps = {
  item: {},
};

export default Task;
