import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {Button, List} from 'semantic-ui-react';
import './styles.css';

const TaskList = ({list, taskChangeState, deleteTask}) => {
    const renderTask = filteredList =>
        filteredList.map(toDoItem => (
            <List key={toDoItem.id}>
                <div className="todo-item__container">
                    <input
                        type="checkbox"
                        id={`todo-item__${toDoItem.id}`}
                        checked={!toDoItem.active}
                        onClick={taskChangeState(toDoItem)}
                    />
                    <label
                        htmlFor={`todo-item__${toDoItem.id}`}
                        className={cn({
                            'todo-toDoItem': true,
                            active: toDoItem.active
                        })}
                    >
                        {toDoItem.value}
                    </label>
                    <Button
                        onClick={deleteTask(toDoItem.id)}
                        circular
                        floated="right"
                        icon="trash"
                    />
                </div>
            </List>
        ));
    return <ul className="todo-list">{renderTask(list)}</ul>;
};

TaskList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    taskChangeState: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default TaskList;
