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
  
  handleKeyDown = (e) => {
    if (e.key === 'Enter' && this.state.text.length > 0) {
      this.handleSubmit(e);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, toDoList } = this.state;
    const toDoItem = {id: _.uniqueId(), value: text, active: true}
    const updatedList = [...toDoList, toDoItem];
    this.setState({ text: '', toDoList: updatedList });
  }

  taskChangeState = (toDoItem) => () => {
    const { toDoList } = this.state;
    const updatedToDoItem = { ...toDoItem, active: !toDoItem.active };
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

  taskFilter = (e) => {
    e.preventDefault();
    const filterOption = e.target.textContent.toLowerCase();
    this.setState({ status: filterOption });
  }

  filterList = () => {
    const { toDoList, status } = this.state;
    switch (status) {
      case 'all': {
        return toDoList;
      }
      case 'active': {
        return toDoList.filter(item => item.active);
      }
      case 'completed': {
        return toDoList.filter(item => !item.active);
      }
      default: 
        throw new Error('Unexpected error');
    }
  };

  onUnload = (e) => {
    const { toDoList, status } = this.state;
    localStorage.setItem('toDoList', JSON.stringify(toDoList.map(toDoItem => ({ value: toDoItem.value, state: toDoItem.state }))));
    localStorage.setItem('status', status);
  }

  componentDidMount() {
    const lsToDoList = JSON.parse(localStorage.getItem('toDoList'));
    const lsStatus = localStorage.getItem('status');
    window.addEventListener("beforeunload", this.onUnload);
    if (lsToDoList) {
      const mappedList = lsToDoList.map(toDoItem => ({...toDoItem, id: _.uniqueId()}));
      this.setState({toDoList: mappedList, status: lsStatus});
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  render() {
    const { text, toDoList, status } = this.state;
    return (
      <form className="taskForm" onSubmit={this.handleSubmit}>
        <Button.Group fluid className="filter-list">
          <Button
            disabled={status === 'all'}
            onClick={this.taskFilter}>All
          </Button>
          <Button
            disabled={status === 'active'}
            onClick={this.taskFilter}>Active
          </Button>
          <Button
            disabled={status === 'completed'}
            onClick={this.taskFilter}>Completed
          </Button>
        </Button.Group>
        <Input
          fluid
          className="taskBar"
          type="text"
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          action='Add task'
          required
          placeholder="Your task..."
        />
        {toDoList.length > 0 && 
        <TaskList
          list={this.filterList()}
          taskChangeState={this.taskChangeState}
          deleteTask={this.deleteTask}
        /> }
      </form>
    );
  }
} 