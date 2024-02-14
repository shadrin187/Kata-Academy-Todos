import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';
export default function Task({
  item,
  onDeleteTask,
  onTaskChange,
  onEditingTask,
  pauseTimer,
  startTimer,
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');

  const { id, description, checked, date, minutes, seconds } = item;

  const onSubmit = (e) => {
    e.preventDefault();
    onEditingTask(id, value);
    setValue('');
    setEditing(false);
  };

  let timer = `${minutes}:`;
  if (String(seconds).length === 1) {
    timer += `0${seconds}`;
  } else {
    timer += seconds;
  }

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : null}>
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
                e.stopPropagation();
                startTimer();
              }}
              id={id}
            />
            <button
              className="icon icon-pause"
              onClick={(e) => {
                e.stopPropagation();
                pauseTimer();
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
          onClick={() => {
            setEditing(!editing)
            setValue(description)
          }}
        />
        <button
          className="icon icon-destroy"
          onClick={() => onDeleteTask(id)}
        />
      </div>
      {editing && (
        <form onSubmit={onSubmit}>
          <input
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="edit"
            value={value}
          />
        </form>
      )}
    </li>
  );
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
