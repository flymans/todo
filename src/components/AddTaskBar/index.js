import React from 'react';
import update from 'immutability-helper';
import _ from 'lodash';
import {Button, Form} from 'semantic-ui-react';
import TaskList from '../taskList';
import Footer from '../footer';

import './styles.css';

export default class AddTaskBar extends React.Component {
    state = {
        text: '',
        toDoList: [],
        status: 'all',
        counter: 0
    };

    componentDidMount() {
        const lsToDoList = JSON.parse(localStorage.getItem('toDoList'));
        const lsStatus = localStorage.getItem('status');
        window.addEventListener('beforeunload', this.onUnload);
        if (lsToDoList && lsStatus) {
            const mappedList = lsToDoList.map(toDoItem => ({
                ...toDoItem,
                id: _.uniqueId()
            }));
            const counter = mappedList.filter(toDoItem => toDoItem.active)
                .length;
            this.setState({toDoList: mappedList, status: lsStatus, counter});
        }
        this.setState({status: 'all'});
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onUnload);
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = e => {
        e.preventDefault();
        const {text, toDoList} = this.state;
        const toDoItem = {id: _.uniqueId(), value: text, active: true};
        const updatedList = [...toDoList, toDoItem];
        const counter = updatedList.filter(item => item.active).length;
        this.setState({text: '', toDoList: updatedList, counter});
    };

    taskChangeState = toDoItem => () => {
        const {toDoList} = this.state;
        const updatedToDoItem = {...toDoItem, active: !toDoItem.active};
        const index = toDoList.indexOf(toDoItem);
        const updatedList = update(toDoList, {
            [index]: {$set: {...updatedToDoItem}}
        });
        const counter = updatedList.filter(item => item.active).length;
        this.setState({toDoList: updatedList, counter});
    };

    deleteTask = id => e => {
        e.preventDefault();
        const {toDoList} = this.state;
        const updatedList = toDoList.filter(toDoItem => toDoItem.id !== id);
        const counter = updatedList.filter(toDoItem => toDoItem.active).length;
        this.setState({toDoList: updatedList, counter});
    };

    deleteFinishedTasks = () => {
        const {toDoList} = this.state;
        const updatedList = toDoList.filter(toDoItem => toDoItem.active);
        this.setState({toDoList: updatedList});
    };

    taskFilter = e => {
        e.preventDefault();
        const filterOption = e.target.textContent.toLowerCase();
        this.setState({status: filterOption});
    };

    filterList = () => {
        const {toDoList, status} = this.state;
        switch (status) {
            case 'all': {
                return toDoList;
            }
            case 'active': {
                return toDoList.filter(toDoItem => toDoItem.active);
            }
            case 'completed': {
                return toDoList.filter(toDoItem => !toDoItem.active);
            }
            default:
                throw new Error('Unexpected error');
        }
    };

    onUnload = () => {
        const {toDoList, status} = this.state;
        localStorage.setItem(
            'toDoList',
            JSON.stringify(
                toDoList.map(toDoItem => ({
                    value: toDoItem.value,
                    active: toDoItem.active
                }))
            )
        );
        localStorage.setItem('status', status);
    };

    render() {
        const {text, toDoList, status, counter} = this.state;
        return (
            <div className="task-list">
                <Button.Group fluid className="filter-list">
                    <Button
                        disabled={status === 'all'}
                        onClick={this.taskFilter}
                    >
                        All
                    </Button>
                    <Button
                        disabled={status === 'active'}
                        onClick={this.taskFilter}
                    >
                        Active
                    </Button>
                    <Button
                        disabled={status === 'completed'}
                        onClick={this.taskFilter}
                    >
                        Completed
                    </Button>
                </Button.Group>
                <Form className="task-form" onSubmit={this.handleSubmit}>
                    <Form.Input
                        fluid
                        className="task-bar"
                        name="text"
                        value={text}
                        onChange={this.handleChange}
                        action="Add task"
                        required
                        placeholder="Your task..."
                    />
                    {toDoList.length > 0 && (
                        <TaskList
                            list={this.filterList()}
                            taskChangeState={this.taskChangeState}
                            deleteTask={this.deleteTask}
                        />
                    )}
                </Form>
                {this.filterList().length > 0 && (
                    <Footer
                        clear={this.deleteFinishedTasks}
                        counter={counter}
                        showButton={
                            toDoList.filter(toDoItem => !toDoItem.active)
                                .length > 0
                        }
                    />
                )}
            </div>
        );
    }
}
