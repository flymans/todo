import React from 'react';
import TaskList from './TaskList';
import _ from 'lodash';
import update from 'immutability-helper';
import { Input, Button } from 'semantic-ui-react';
import './styles.css';

export default class AddTaskBar extends React.Component {
  state = {
    text: '',
    toDoList: [],
    status: 'all',
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ text: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, toDoList } = this.state;
    const toDoItem = {id: _.uniqueId(), value: text, state: 'active'}
    const updatedList = [...toDoList, toDoItem];
    this.setState({ text: '', toDoList: updatedList });
  }

  taskChangeState = (toDoItem) => () => {
    const { toDoList } = this.state;
    const mapping = {
      active: 'completed',
      completed: 'active',
    }
    const updatedToDoItem = { ...toDoItem, state: mapping[toDoItem.state] };
    const index = toDoList.indexOf(toDoItem);
    const updatedList = update(toDoList, { [index]: { $set: { ...updatedToDoItem } } });
    this.setState({ toDoList: updatedList });
  }
  
  deleteTask = (id) => (e) => {
    e.preventDefault();
    const { toDoList } = this.state;
    const updatedList = toDoList.filter(toDoItem => toDoItem.id !== id);
    this.setState({ toDoList: updatedList });
  }
  
  taskFilterAll = (e) => {
    e.preventDefault();
    this.setState({ status: 'all' });
  }

  taskFilterActive = (e) => {
    e.preventDefault();
    this.setState({ status: 'active' });
  }

  taskFilterCompleted = (e) => {
    e.preventDefault();
    this.setState({ status: 'completed' });
  }

  componentDidMount() {
    const lsToDoList = JSON.parse(localStorage.getItem('toDoList')); 
    if (lsToDoList) {
      const mappedList = lsToDoList.map(toDoItem => ({...toDoItem, id: _.uniqueId()}));
      this.setState({toDoList: mappedList});
    }
  }

  componentDidUpdate() {
    localStorage.setItem('toDoList', JSON.stringify(this.state.toDoList));
  }

  render() {
    const { text, toDoList, status } = this.state;
    return (
      <form className="taskBar" onSubmit={this.handleSubmit}>
        <Button.Group className="filter-list">
          <Button
            disabled={status === 'all'}
            onClick={this.taskFilterAll}>All
          </Button>
          <Button
            disabled={status === 'active'}
            onClick={this.taskFilterActive}>Active
          </Button>
          <Button
            disabled={status === 'completed'}
            onClick={this.taskFilterCompleted}>Completed
          </Button>
        </Button.Group>
        <Input
          className="taskBar"
          type="text"
          value={text}
          onChange={this.handleChange}
          action='Add task'
          required
          placeholder="Your task..."
        />
        {toDoList.length > 0 && 
        <TaskList
          list={toDoList}
          status={status}
          taskChangeState={this.taskChangeState}
          deleteTask={this.deleteTask}
        /> }
      </form>
    );
  }
} 