import React from 'react';
import TaskList from './TaskList';
import _ from 'lodash';
import update from 'immutability-helper';

export default class AddTaskBar extends React.Component {
  state = {
    text: '',
    toDoList: [],
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
      active: 'finished',
      finished: 'active',
    }
    const updatedToDoItem = { ...toDoItem, state: mapping[toDoItem.state] };
    const index = toDoList.indexOf(toDoItem);
    const updatedList = update(toDoList, { [index]: { $set: { ...updatedToDoItem } } });
    this.setState({ toDoList: updatedList });
  }
  
  deleteTask = (id) => () => {
    const { toDoList } = this.state;
    const updatedList = toDoList.filter(toDoItem => toDoItem.id !== id);
    this.setState({ toDoList: updatedList });
  }

  render() {
    const { text, toDoList } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={text} onChange={this.handleChange} required placeholder="Your task..."/>
        <input type="submit" value='Add task' />
        {toDoList.length > 0 && <TaskList list={toDoList} taskChangeState={this.taskChangeState} deleteTask={this.deleteTask}/> }
      </form>
    );
  }
} 