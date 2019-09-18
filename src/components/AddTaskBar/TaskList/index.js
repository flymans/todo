import React from 'react';
import cn from 'classnames';
import './styles.css';
import { Button, List } from 'semantic-ui-react';


const TaskList = ({ list, taskChangeState, deleteTask }) => {
  const renderTask = (filteredList) => filteredList.map((toDoItem) => (
    <List key={toDoItem.id}>
      <div className="todo-item__container">
        <div
          id={`todo-item__${toDoItem.id}`}
          className={cn({
            'todo-toDoItem': true,
            active: toDoItem.active,
          })}
          onClick={taskChangeState(toDoItem)}
        >
          {toDoItem.value}
        </div>
        <label className="todo-item__close-button" htmlFor={`todo-item_${toDoItem.id}`}>
          <Button onClick={deleteTask(toDoItem.id)} circular floated="right" icon="trash" />
        </label>
      </div>
    </List>
  ));
  return (
    <ul className="todo-list">
      {renderTask(list)}
    </ul>
  );
};

export default TaskList;
