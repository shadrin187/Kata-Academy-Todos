import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  render() {
    const { onAddTask } = this.props;

    const onSubmit = (e) => {
      e.preventDefault();
      if (this.state.value.trim()) {
        onAddTask(this.state.value);
      }
      this.setState({ value: '' });
    };

    return (
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => this.setState({ value: e.target.value })}
          value={this.state.value}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
