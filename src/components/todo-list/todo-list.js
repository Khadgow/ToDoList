import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant, filter, activeSearch }) => {
  let filteredItems;
if (!filter.trim()){
  filteredItems = todos;
}else{
  filteredItems = todos.filter((item) => {return item.label.toLowerCase().includes(filter)});
}

if(activeSearch !== 'all'){
  if (activeSearch === 'done'){
    filteredItems = filteredItems.filter((item) => {return item.done});
  }
  else {
    filteredItems = filteredItems.filter((item) => {return !item.done});
  }

}
  const elements = filteredItems.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
            {...itemProps }
            onDeleted={ () => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
