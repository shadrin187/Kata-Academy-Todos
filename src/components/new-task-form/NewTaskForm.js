import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default function NewTaskForm({ onAddTask }) {
  const [value, setValue] = useState('');
  const [minutesValue, setMinutesValue] = useState('');
  const [secondsValue, setSecondsValue] = useState('');

  const onKeyboardDown = (e) => {
    if (
      e.key === 'Enter' &&
      value !== '' &&
      minutesValue !== '' &&
      secondsValue !== '' &&
      secondsValue < 60
    ) {
      onAddTask(value, minutesValue, secondsValue);
      setValue('');
      setMinutesValue('');
      setSecondsValue('');
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={onKeyboardDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        value={minutesValue}
        onChange={(e) => setMinutesValue(e.target.value)}
        onKeyDown={onKeyboardDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        value={secondsValue}
        onChange={(e) => setSecondsValue(e.target.value)}
        onKeyDown={onKeyboardDown}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
