import React from "react";
import cn from 'classnames';
import './styles.css';
import { Button, List } from 'semantic-ui-react';


const TaskList = ({ list, taskChangeState, deleteTask }) => {
  return (
    <ul>
      {list.map(toDoItem => (
        <List key={toDoItem.id}>
          <div className="toDoContainer">
            <div id={`toDoItem_${toDoItem.id}`} className={cn({
              toDoItem: true,
              [toDoItem.state]: true,
            })} onClick={taskChangeState(toDoItem)}>{toDoItem.value}</div>
            <label htmlFor={`toDoItem_${toDoItem.id}`}><Button onClick={deleteTask(toDoItem.id)} size='mini' icon='close icon' /></label>
          </div>
        </List>
      ))}
    </ul>
  );
};

export default TaskList;
