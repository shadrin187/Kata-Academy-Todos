import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
    minutesValue: '',
    secondsValue: '',
  };

  render() {
    const { onAddTask } = this.props;
    const { value, minutesValue, secondsValue } = this.state;

    this.onKeyboardDown = (e) => {
      if (
        e.key === 'Enter' &&
        value !== '' &&
        minutesValue !== '' &&
        secondsValue !== '' &&
        secondsValue < 60
      ) {
        onAddTask(value, minutesValue, secondsValue);
        this.setState({ value: '', minutesValue: '', secondsValue: '' });
      }
    };

    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => this.setState({ value: e.target.value })}
          value={value}
          onKeyDown={this.onKeyboardDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={minutesValue}
          onChange={(e) => this.setState({ minutesValue: e.target.value })}
          onKeyDown={this.onKeyboardDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={secondsValue}
          onChange={(e) => this.setState({ secondsValue: e.target.value })}
          onKeyDown={this.onKeyboardDown}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
