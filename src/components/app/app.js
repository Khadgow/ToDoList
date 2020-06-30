import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component{

    maxId = localStorage.todoData ? JSON.parse(localStorage.todoData).length : 0;

    initialStateData = () =>{
        if(localStorage.todoData){
             let newStateData = [];
            JSON.parse(localStorage.todoData).forEach( (item, index) =>{
                item.id = index;
                newStateData.push(item);
            });
            return newStateData;
        } else {
            return [];
        }
    };

    state = {
        todoData: this.initialStateData(),
        find: '',
        activeSearch: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) =>{
          return{
              todoData: [...todoData, newItem]
          }
        });
    };

    deleteItem = (id) =>{
        this.setState(({todoData})=>{
        const idx = todoData.findIndex((el) => el.id ===id);
        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
        return{
            todoData: newArray
        }
        });
    };

    toggleProperty(arr, id, propName) {

        const idx = arr.findIndex((el) => el.id ===id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [...arr.slice(0, idx), newItem ,  ...arr.slice(idx + 1)];
    }

    onToggleImportant = (id) => {

        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onFilter = (e) =>{
        this.setState({
            find: e.target.value
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.todoData !== prevState.todoData){
            localStorage.todoData = JSON.stringify(this.state.todoData);
        }
    }

    onChangeActiveSearch = (text) =>{
        this.setState({
           activeSearch: text
        });
    };

    render() {
        const {todoData} = this.state;

        const doneCount = todoData.filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;


        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel filter={this.onFilter} />

                    <ItemStatusFilter
                    changeSearch={this.onChangeActiveSearch}
                    />

                </div>

                <TodoList
                    activeSearch={this.state.activeSearch}
                    filter={this.state.find}
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm addItem = {this.addItem} />
            </div>
        );
    }


}
